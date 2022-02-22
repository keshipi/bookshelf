import React, { useState, useEffect } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { BookList } from './../components/BookList';
import { Pagination } from './../components/Pagination';
import { SearchBox } from './../components/SearchBox';

type Result = {
  total: number;
  books: Book[];
};

type SearchParam = {
  query: string;
  page: string;
};

export const Books = () => {
  const pagePerItems = 40;
  const [result, setResult] = useState<Result>({ total: 0, books: [] });
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParam, setSearchParam] = useState<SearchParam>({
    query: searchParams.get('query') || '',
    page: searchParams.get('page') || '0',
  });

  const handleSearch = (query: string) => {
    if (!query) return;
    const newSearchParam = {query, page: '0'};
    const params = createSearchParams(newSearchParam).toString()
    setSearchParams(new URLSearchParams(params));
    setSearchParam(newSearchParam)
  };

  const handlePageClick = (selectedPage: number) => {
    const page = selectedPage.toString();
    const newSearchParam = {...searchParam, ...{page}};
    const params = createSearchParams(newSearchParam).toString()
    setSearchParams(new URLSearchParams(params));
    setSearchParam(newSearchParam)
  };

  useEffect(() => {
    if (!searchParam.query) return;
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchParam.query}&maxResults=40&startIndex=${
        Number(searchParam.page) * pagePerItems
      }`
    )
      .then((res) => res.json())
      .then((res) =>
        setResult({
          total: res.totalItems,
          books: mapBooksFromGoogle(res.items),
        })
      );
  }, [searchParam]);

  const mapBooksFromGoogle = (res: any): Book[] => {
    return res.map((item: any, i: Number) => {
      return {
        id: `${item.id}`,
        name: item.volumeInfo.title,
        image:
          item.volumeInfo.imageLinks?.thumbnail ??
          'http://placehold.jp/3d4070/ffffff/150x150.png',
      };
    });
  };

  return (
    <>
      <div className="py-6 sm:py-8 lg:py-12">
        <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
          <SearchBox text={searchParam.query} onSearch={handleSearch}></SearchBox>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <BookList items={result.books}></BookList>
        </div>
      </div>
      {result.total ? (
        <div className="flex items-center justify-center">
          <Pagination
            total={result.total}
            forcePage={Number(searchParam.page)}
            pagePerItems={pagePerItems}
            onPageClick={handlePageClick}
          ></Pagination>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
