import React, { useState, useEffect } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import { Box, Center } from '@chakra-ui/react';

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
    page: searchParams.get('page') || '1',
  });
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    if (!query) return;
    const newSearchParam = { query, page: '1' };
    const params = createSearchParams(newSearchParam).toString();
    setSearchParams(new URLSearchParams(params));
    setSearchParam(newSearchParam);
  };

  const handlePageClick = (selectedPage: number) => {
    const page = selectedPage.toString();
    const newSearchParam = { ...searchParam, ...{ page } };
    const params = createSearchParams(newSearchParam).toString();
    setSearchParams(new URLSearchParams(params));
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    if (!searchParam.query) return;
    setIsSearching(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        searchParam.query
      }&maxResults=40&startIndex=${(Number(searchParam.page) - 1) * pagePerItems}`
    )
      .then((res) => res.json())
      .then((res) =>
        setResult({
          total: res.totalItems,
          books: mapBooksFromGoogle(res.items),
        })
      )
      .finally(() => {
        setIsSearching(false);
      });
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
      <Box w="100%" p={4}>
        <SearchBox
          text={searchParam.query}
          onSearch={handleSearch}
          isLoading={isSearching}
        ></SearchBox>
      </Box>
      <Box w="100%">
        <BookList items={result.books}></BookList>
      </Box>
      {result.total ? (
        <Box w="100%" p={4}>
          <Center>
            <Pagination
              totalCount={result.total}
              pageSize={pagePerItems}
              onClick={handlePageClick}
              currentPage={Number(searchParam.page)}
            ></Pagination>
          </Center>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
