import React from 'react';

import { Grid } from '@chakra-ui/react';

import { BookItem } from '@/components/BookItem';
type Props = {
  items: Book[];
};

export const BookList = (props: Props) => {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={6}>
      {props.items.map((book: Book) => {
        return <BookItem key={book.isbn} {...book}></BookItem>;
      })}
    </Grid>
  );
};
