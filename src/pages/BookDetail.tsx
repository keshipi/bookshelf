import React from 'react';
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

import { Whoops404 } from '@/pages/404';

interface BookDetailState {
  book: Book | null;
}

export const BookDetail = () => {
  const location = useLocation();
  console.log(location.state);
  const state = location.state as BookDetailState;
  const { book } = state;

  return (
    <>
      {book ? (
        <Flex p="8">
          <Box w="30%">
            <Center>
              <Image src={book.image} alt={book.title} w="75%" />
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
