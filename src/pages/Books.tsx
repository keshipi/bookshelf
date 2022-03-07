import React from 'react';

import { QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Code,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
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
    isbn,
    isbn_10,
    title,
    authors,
    publisher,
    date_of_publish,
    descriptions,
  }): Book => {
    return {
      isbn,
      isbn_10,
      title,
      authors,
      publisher,
      date_of_publish,
      descriptions,
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

  const isIncluded = (haystack: string, needle: string) => {
    return haystack
      .replace(/\s+/g, '')
      .toLowerCase()
      .includes(needle.replace(/\s+/g, '').toLowerCase());
  };

  const isIncludedInArray = (haystack: string[], needle: string) => {
    return (
      haystack.filter((h) => {
        return isIncluded(h, needle);
      }).length > 0
    );
  };

  const filterdBooks = books.filter((book) => {
    if (!searchParams.query.includes(':')) {
      const isIncludedInTitle = isIncluded(book.title, searchParams.query);
      const isIncludedInDescriptioin = isIncludedInArray(
        book.descriptions,
        searchParams.query
      );
      return isIncludedInTitle || isIncludedInDescriptioin;
    }

    const [field, search] = searchParams.query.split(':');
    switch (field) {
      case 'title':
        return isIncluded(book.title, search);
      case 'description':
        return isIncludedInArray(book.descriptions, search);
      case 'publisher':
        return isIncluded(book.publisher, search);
      case 'author': {
        return isIncludedInArray(book.authors, search);
      }
      default: {
        const isIncludedInTitle = isIncluded(book.title, search);
        const isIncludedInDescriptioin = isIncludedInArray(
          book.descriptions,
          search
        );
        return isIncludedInTitle || isIncludedInDescriptioin;
      }
    }
  });

  const slicedBooks = (books: Book[]) => {
    return books.slice(
      (searchParams.page - 1) * pagePerItems,
      searchParams.page * pagePerItems
    );
  };

  return (
    <>
      <Box w="100%" p={4}>
        <HStack>
          <SearchBox
            text={searchParams.query}
            onSearch={handleSearch}
          ></SearchBox>

          <Popover>
            <PopoverTrigger>
              <IconButton
                color="teal"
                aria-label="Question"
                icon={<QuestionOutlineIcon />}
                backgroundColor="transparent"
                _hover={{ backgroundColor: 'transparent' }}
                _focus={{ backgroundColor: 'transparent' }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                検索オプション
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Box mb={1}>
                  <Code>title:</Code>{' '}
                  を検索ワードの前に追加してタイトルを検索する
                </Box>
                <Box mb={1}>
                  <Code>description:</Code>{' '}
                  を検索ワードの前に追加して説明を検索する
                </Box>
                <Box mb={1}>
                  <Code>author:</Code>{' '}
                  を検索ワードの前に追加して著者名で検索する
                </Box>
                <Box>
                  <Code>publisher:</Code>{' '}
                  を検索ワードの前に追加して出版社名で検索する
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </Box>
      <Box w="100%">
        <BookList items={slicedBooks(filterdBooks)}></BookList>
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
