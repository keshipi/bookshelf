import React from 'react';
import { BookItem } from './BookItem';
import { Grid } from '@chakra-ui/react';
type Props = {
  items: Book[];
};

export const BookList = (props: Props) => {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={6}>
      {props.items.map((book: any) => {
        return (
          <BookItem
            key={book.id}
            id={book.id}
            name={book.name}
            image={book.image}
          ></BookItem>
        );
      })}
    </Grid>
  );
};
