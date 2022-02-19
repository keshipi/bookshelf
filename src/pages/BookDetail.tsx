import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<BookDetail>({
    id: '',
    name: '',
    authors: [],
    image: '',
    description: '',
  });

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((res) => res.json())
      .then((res) =>
        setBook({
          id: res.id,
          name: res.volumeInfo.title,
          authors: res.volumeInfo.authors,
          image: res.volumeInfo.imageLinks.thumbnail,
          description: res.volumeInfo.description,
        })
      );
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden relative">
              <img
                src={book.image}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="inline-block text-gray-500 mb-0.5">
                {book.authors.join(', ')}
              </span>
              <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {book.name}
              </h2>
            </div>

            <div className="mt-5 md:mt-8 lg:mt-10">
              <p
                className="text-gray-500"
                dangerouslySetInnerHTML={{ __html: book.description }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
