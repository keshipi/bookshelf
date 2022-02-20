import React, { useState } from 'react';

type Props = {
  text: string
  onSearch: (search: string) => void
}

export const SearchBox = (props: Props) => {
  const [search, setSearch] = useState(props.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    props.onSearch(search)
  }

  return (
    <>
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
          type="button"
          className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
          onClick={handleClick}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
};
