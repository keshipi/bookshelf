import React from 'react';

import { Box, Center } from '@chakra-ui/react';
import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';

import { BookList } from '@/components/BookList';
import { Pagination } from '@/components/Pagination';
import { SearchBox } from '@/components/SearchBox';
import data from '@/data.json';

const books: Book[] = data.books.map(
  ({
    isbn_10,
    isbn_13,
    title,
    author,
    publisher,
    published_year,
    number_of_page,
  }): Book => {
    return {
      isbn_10,
      isbn_13,
      title,
      author,
      publisher,
      published_year,
      number_of_page,
      image: `https://images-na.ssl-images-amazon.com/images/P/${isbn_10}.09.LZZZZZZZ.jpg`,
    };
  }
);

export const Books = () => {
  const pagePerItems = 40;
  const [searchParams, setSearchParams] = useQueryParams({
    query: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1),
  });

  const handleSearch = (query: string) => {
    setSearchParams({ query: query });
  };

  const handlePageClick = (selectedPage: number) => {
    setSearchParams({ page: selectedPage });
  };

  const filterdBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .match(new RegExp(searchParams.query.toLowerCase() || ''))
  );

  const slicedBooks = (books: Book[]) => {
    return books.slice(
      (searchParams.page - 1) * pagePerItems,
      searchParams.page * pagePerItems
    );
  };

  return (
    <>
      <Box w="100%" p={4}>
        <SearchBox
          text={searchParams.query}
          onSearch={handleSearch}
        ></SearchBox>
      </Box>
      <Box w="100%">
        <BookList
          items={slicedBooks(filterdBooks)}
        ></BookList>
      </Box>
      {filterdBooks.length ? (
        <Box w="100%" p={4}>
          <Center>
            <Pagination
              totalCount={filterdBooks.length}
              pageSize={pagePerItems}
              onClick={handlePageClick}
              currentPage={searchParams.page}
            ></Pagination>
          </Center>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
