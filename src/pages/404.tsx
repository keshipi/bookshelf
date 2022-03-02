import React from 'react';
import { Link as LinkRoute } from 'react-router-dom';

import { Text, Link, VStack } from '@chakra-ui/react';

export const Whoops404 = () => {
  return (
    <VStack mt="4">
      <Text color="blue" textTransform="uppercase">
        That’s a 404
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        Page not found
      </Text>
      <Text fontSize="lg" color="gray">
        The page you’re looking for doesn’t exist.
      </Text>
      <Link as={LinkRoute} to="/books" color="gray.500">
        TOPへもどる
      </Link>
    </VStack>
  );
};
