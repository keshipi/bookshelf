import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Books, BookDetail, Whoops404 } from './pages';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/books/:id" element={<BookDetail />}></Route>
        <Route path="*" element={<Whoops404 />}></Route>
      </Routes>
    </div>
  );
}
