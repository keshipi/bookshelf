import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Books, BookDetail, Whoops404 } from './pages';

import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider>
      <Container maxW='container.xl'>
        <Routes>
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="*" element={<Whoops404 />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}
