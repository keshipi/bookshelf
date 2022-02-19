import React from 'react';
import { BookItem } from './BookItem';

type Props = {
  items: Book[];
};

export const BookList = (props: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-8 xl:gap-x-8">
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
    </div>
  );
};
