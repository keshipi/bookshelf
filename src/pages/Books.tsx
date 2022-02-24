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

export const Books = () => {
  const pagePerItems = 40;
  const [result, setResult] = useState<Result>({ total: 0, books: [] });
  const [searchParams, setSearchParams] = useSearchParams(
    createSearchParams({ query: '', page: '1' })
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    if (!query) return;
    const newSearchParam = { query, page: '1' };
    setSearchParams(createSearchParams(newSearchParam));
  };

  const handlePageClick = (selectedPage: number) => {
    const newSearchParam = {
      query: searchParams.get('query') || '',
      page: selectedPage.toString(),
    };
    setSearchParams(createSearchParams(newSearchParam));
  };

  useEffect(() => {
    if (!searchParams.get('query')) return;
    setIsSearching(true);
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&startIndex=${
        (page - 1) * pagePerItems
      }`
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
  }, [searchParams]);

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
          text={searchParams.get('query') || ''}
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
              currentPage={Number(searchParams.get('page'))}
            ></Pagination>
          </Center>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
