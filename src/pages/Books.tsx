import React, { useState } from 'react';

import { BookList } from './../components/BookList';
import { Pagination } from './../components/Pagination';

type Result = {
  total: number;
  books: Book[];
};

export function Books() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<Result>({ total: 0, books: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    fetchData(0);
  };

  const fetchData = async (startIndex: number) => {
    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&startIndex=${startIndex}`
    )
      .then((res) => res.json())
      .then((res) =>
        setResult({
          total: res.totalItems,
          books: mapBooksFromGoogle(res.items),
        })
      );
  };

  const mapBooksFromGoogle = (res: any): Book[] => {
    return res.map((item: any, i: Number) => {
      return {
        // id: `${item.id}__${i}`,
        id: `${item.id}`,
        name: item.volumeInfo.title,
        image:
          item.volumeInfo.imageLinks?.thumbnail ??
          'http://placehold.jp/3d4070/ffffff/150x150.png',
      };
    });
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen from-cyan-100 via-pink-200 to-yellow-200 bg-gradient-to-br">
        <div className="py-6 sm:py-8 lg:py-12">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
              <div className="w-full">
                <input
                  type="search"
                  value={search}
                  onChange={handleChange}
                  className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                  placeholder="search"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <BookList items={result.books}></BookList>
          </div>
        </div>
        {result.total ? (
          <div className="flex items-center justify-center">
            <Pagination
              total={result.total}
              handlePageClick={(selectedPage: number) =>
                fetchData(selectedPage)
              }
            ></Pagination>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
