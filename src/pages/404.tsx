import Redct from 'react';

export const Whoops404 = () => {
  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="flex flex-col items-center">
          <p className="text-indigo-500 text-sm md:text-base font-semibold uppercase mb-4">
            That’s a 404
          </p>
          <h1 className="text-gray-800 text-2xl md:text-3xl font-bold text-center mb-2">
            Page not found
          </h1>
          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mb-12">
            The page you’re looking for doesn’t exist.
          </p>
        </div>
      </div>
    </div>
  );
}
