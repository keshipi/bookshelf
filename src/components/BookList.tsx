import React from 'react';
import { BookItem } from './BookItem';
import { Grid } from '@chakra-ui/react';
type Props = {
  items: Book[];
};

export const BookList = (props: Props) => {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={6}>
      {props.items.map((book: Book, index: number) => {
        return <BookItem key={book.isbn_10 + '_' + index} {...book}></BookItem>;
      })}
    </Grid>
  );
};
