import React from 'react';

import { HStack, Button } from '@chakra-ui/react';

type Props = {
  totalCount: number;
  pageSize: number;
  onClick: (index: number) => void;
  currentPage: number;
};

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

export const Pagination = (props: Props) => {
  return (
    <HStack w="full" justifyContent="center" align="center" py={5}>
      {range(1, Math.ceil(props.totalCount / props.pageSize)).map(
        (number, index) => (
          <Button
            as="a"
            key={index}
            onClick={() => props.onClick(number)}
            bg={props.currentPage === number ? 'blue.500' : 'blue.100'}
            color={props.currentPage === number ? 'white' : 'blue.600'}
            _hover={{
              bg: 'blue.300',
              color: 'white',
            }}
            borderRadius="full"
          >
            {number}
          </Button>
        )
      )}
    </HStack>
  );
};
