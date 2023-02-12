import { SearchIcon } from "@chakra-ui/icons";
import {
  border,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      align="center"
      display={{ base: "none", md: "flex" }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          {<SearchIcon color="gray.300" fontSize="18px" />}
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Reddit"
          fontSize="11pt"
          _placeholder={{ color: "grey.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="40px"
          bg="gray.50"
          borderRadius="50px"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
