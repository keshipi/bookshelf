import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Image, Text } from '@chakra-ui/react';

export const BookItem = (props: Book) => {
  return (
    <Link to={`/books/${props.isbn}`} className="group">
      <Box>
        <Image src={props.image} alt={props.title} />
        <Text fontSize='md'>{props.title}</Text>
      </Box>
    </Link>
  );
};
