import React, { useState, useEffect } from 'react';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { Box, Center } from '@chakra-ui/react';
import { BookList } from './../components/BookList';
import { Pagination } from './../components/Pagination';
import { SearchBox } from './../components/SearchBox';
import data from '../data.json';

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
  const [searchParams, setSearchParams] = useSearchParams(
    createSearchParams({ query: '', page: '1' })
  );

  const handleSearch = (query: string) => {
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

  const filterdBooks = books.filter((book) =>
    book.title.toLowerCase().match(new RegExp(searchParams.get('query')?.toLowerCase() || ''))
  );

  return (
    <>
      <Box w="100%" p={4}>
        <SearchBox
          text={searchParams.get('query') || ''}
          onSearch={handleSearch}
        ></SearchBox>
      </Box>
      <Box w="100%">
        <BookList
          items={filterdBooks.slice(
            (Number(searchParams.get('page')) - 1) * pagePerItems,
            Number(searchParams.get('page')) * pagePerItems
          )}
        ></BookList>
      </Box>
      {filterdBooks.length ? (
        <Box w="100%" p={4}>
          <Center>
            <Pagination
              totalCount={filterdBooks.length}
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
