import React from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  total: number;
  pagePerItems: number;
  initialPage: number;
  onPageClick: Function;
};

export const Pagination = (props: Props) => {
  const handlePageChange = (selectedItem: { selected: number }) =>
    props.onPageClick(selectedItem.selected);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        initialPage={props.initialPage}
        onPageChange={handlePageChange}
        pageRangeDisplayed={2}
        pageCount={Math.ceil(props.total / props.pagePerItems)}
        className="inline-flex -space-x-px"
        previousLinkClassName="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        nextLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        breakLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        pageLinkClassName="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        activeLinkClassName="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};
