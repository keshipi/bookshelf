import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ChakraProvider , Container } from '@chakra-ui/react';

import { Books, BookDetail, Whoops404 } from '@/pages';


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
