import React, { useState } from 'react';

import { HStack, Input, Button } from '@chakra-ui/react';


type Props = {
  text: string;
  onSearch: (search: string) => void;
};

export const SearchBox = (props: Props) => {
  const [search, setSearch] = useState(props.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    props.onSearch(search);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      props.onSearch(search);
    }
  };

  return (
    <HStack>
      <Input
        placeholder="What are you interested in?"
        value={search}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Button
        colorScheme="teal"
        onClick={handleClick}
      >
        Search
      </Button>
    </HStack>
  );
};
