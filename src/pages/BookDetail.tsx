import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail>();

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((res) =>
        setBook({
          id: res.id,
          name: res.volumeInfo.title,
          image: res.volumeInfo.imageLinks.thumbnail,
          description: res.volumeInfo.description,
        })
      );
  }, []);

  return <div>BookDetails {id}</div>;
}
