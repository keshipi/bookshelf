import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Books, BookDetail, Whoops404 } from './pages';

export default function App() {
  return (
    <div className="min-h-screen from-cyan-100 via-pink-200 to-yellow-200 bg-gradient-to-br">
      <Routes>
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books" element={<Books />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}
