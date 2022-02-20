import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { BookList } from './../components/BookList';
import { Pagination } from './../components/Pagination';
import { SearchBox } from './../components/SearchBox';

type Result = {
  total: number;
  books: Book[];
};

export const Books = () => {
  const query= new URLSearchParams(useLocation().search);
  const [search, setSearch] = useState(query.get('q') ?? '');
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<Result>({ total: 0, books: [] });
  
  useEffect(() => {
    if (!search) return;

    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=${index}`
    )
      .then((res) => res.json())
      .then((res) =>
        setResult({
          total: res.totalItems,
          books: mapBooksFromGoogle(res.items),
        })
      );
  }, [search, index]);

  const handleSearch = (search: string) => {
    setSearch(search);
    if (!search) return;
    fetchBooks(search, 0);
  };

  const fetchBooks = async (search: string, startIndex: number) => {
    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=${startIndex}`
    )
      .then((res) => res.json())
      .then((res) =>
        setResult({
          total: res.totalItems,
          books: mapBooksFromGoogle(res.items),
        })
      );
  };

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
          <SearchBox text={search} onSearch={handleSearch}></SearchBox>
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
            onPageClick={(selectedPage: number) =>
              fetchBooks(search, selectedPage)
            }
          ></Pagination>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
