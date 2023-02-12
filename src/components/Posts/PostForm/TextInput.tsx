import { Button, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputProps = {
  textInputs: {
    title: string;
    body: string;
  };

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleCreatePost: () => void;
  loading: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        height="150px"
        borderRadius={4}
        placeholder="Text(optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        _focusVisible={{
          outline: "none",
        }}
      />
    </Stack>
  );
};
export default TextInput;
