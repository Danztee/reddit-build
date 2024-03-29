import React, { MouseEventHandler, useState } from "react";
import { Flex, Textarea, Button, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthButtons from "../../Navbar/RightContent/AuthButtons";

type CommentInputProps = {
  commentText: string;
  setCommentText: (value: string) => void;
  createLoading: boolean;
  user?: User | null;
  onCreateComment: (comment: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  createLoading,
  user,
  onCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative" mt={4}>
      <>
        <Text mb={2}>
          Comment as{" "}
          <span style={{ color: "#3182CE" }}>{user?.email?.split("@")[0]}</span>
        </Text>
        <Textarea
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="What are your thoughts?"
          fontSize="12pt"
          borderRadius={4}
          minHeight="160px"
          _focusVisible={{
            outline: "none",
          }}
          pb={10}
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid black",
          }}
        />
        <Flex
          position="absolute"
          left="1px"
          right="1px"
          bottom="2px"
          justify="flex-end"
          bg="gray.100"
          p="6px 8px"
          borderRadius="0px 0px 4px 4px"
        >
          <Button
            height="26px"
            fontSize="11pt"
            isDisabled={!commentText.length}
            isLoading={createLoading}
            onClick={() => onCreateComment(commentText)}
          >
            Comment
          </Button>
        </Flex>
      </>
    </Flex>
  );
};
export default CommentInput;
