import React from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';

import data from '@/data.json';
import { Whoops404 } from '@/pages/404';

interface BookDetailState {
  book: Book | null;
}

export const BookDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = (location.state as BookDetailState) || {
    book: data.books.find((book) => book.isbn === id) || null,
  };
  const book = state.book;

  return (
    <>
      {book ? (
        <Flex p="8">
          <Box w="30%">
            <Center>
              <Image
                src={`https://images-na.ssl-images-amazon.com/images/P/${book.isbn_10}.09.LZZZZZZZ.jpg`}
                alt={book.title}
                w="75%"
              />
            </Center>
          </Box>
          <Box w="70%">
            <Stack spacing={6}>
              <Box color="gray.500">
                {book.authors.map((author: string) => {
                  return (
                    <Link
                      key={author}
                      to={`/books?query=author:` + encodeURIComponent(author)}
                    >
                      <Text as="span" mr={2}>
                        {author}
                      </Text>
                    </Link>
                  );
                })}
              </Box>
              <Heading as="h1">{book.title}</Heading>
              {book.descriptions.map((description: string, index: number) => {
                return (
                  <Text
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: description.replaceAll('\n', '</br>'),
                    }}
                  ></Text>
                );
              })}
            </Stack>
          </Box>
        </Flex>
      ) : (
        <Whoops404 />
      )}
    </>
  );
};
