import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import {
  Box,
  Center,
  Spinner,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';

import { Whoops404 } from '@/pages/404';

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail>();
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.totalItems > 0) {
          setBook({
            id: res.items[0].id,
            name: res.items[0].volumeInfo.title,
            authors: res.items[0].volumeInfo.authors || [],
            image: `https://images-na.ssl-images-amazon.com/images/P/${id}.09.LZZZZZZZ.jpg`,
            description: res.items[0].volumeInfo.description,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, []);

  return (
    <>
      {isSearching ? (
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : book ? (
        <Flex p="8">
          <Box w="30%">
            <Center>
              <Image src={book.image} alt={book.name} w="75%" />
            </Center>
          </Box>
          <Box w="70%">
            <Stack spacing={6}>
              <Box color="gray.500">
                {book.authors.map((author: string) => {
                  return (
                    <Link key={author} to={`/books?query=author:${author}`}>
                      <Text as="span" mr={2}>{author}</Text>
                    </Link>
                  );
                })}
              </Box>
              <Heading as="h1">{book.name}</Heading>
              <Text
                dangerouslySetInnerHTML={{ __html: book.description }}
              ></Text>
            </Stack>
          </Box>
        </Flex>
      ) : (
        <Whoops404 />
      )}
    </>
  );
};
