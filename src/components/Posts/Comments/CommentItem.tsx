import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaReddit } from "react-icons/fa";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>

      <Stack spacing={1}>
        <Stack direction="row" align="center" fontSize="10pt">
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="12pt">{comment.text}</Text>
        <Stack direction="row" align="center" cursor="pointer" color="gray.500">
          <Icon
            as={BiUpvote}
            color={"gray.400"}
            fontSize={20}
            onClick={() => {}}
            cursor="pointer"
          />
          <Text fontSize="10pt">0</Text>
          <Icon
            as={BiDownvote}
            color={"gray.400"}
            fontSize={20}
            onClick={() => {}}
            cursor="pointer"
          />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" padding="8px" _hover={{ bg: "gray.200" }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                padding="8px"
                _hover={{ bg: "gray.200" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
