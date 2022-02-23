import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text } from '@chakra-ui/react';

export const BookItem = (props: Book) => {
  return (
    <Link to={`/books/${props.id}`} className="group">
      <Box>
        <Image src={props.image} alt={props.name} />
        <Text fontSize='md'>{props.name}</Text>
      </Box>
    </Link>
  );
};
