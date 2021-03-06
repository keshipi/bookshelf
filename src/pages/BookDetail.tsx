import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
import { Whoops404 } from './404';

export const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail>();
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setBook({
          id: res.id,
          name: res.volumeInfo.title,
          authors: res.volumeInfo.authors || [],
          image: res.volumeInfo.imageLinks.thumbnail,
          description: res.volumeInfo.description,
        });
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
              <Image src={book.image} alt={book.name} w="50%" />
            </Center>
          </Box>
          <Box w="70%">
            <Stack spacing={6}>
              <Text color="gray.500">{book.authors.join(', ')}</Text>
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
