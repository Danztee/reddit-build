import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineGift } from "react-icons/ai";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { BsChatSquare, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { setTimeout } from "timers";
import { Post, postDeleted } from "../../atoms/postAtom";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostPage = !onSelectPost;
  const [error, setError] = useState(false);
  const router = useRouter();

  const setPostDeletedValue = useSetRecoilState(postDeleted);

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }
      setPostDeletedValue((prev) => ({
        ...prev,
        deleted: true,
      }));

      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }

      setTimeout(() => {
        setPostDeletedValue((prev) => ({
          ...prev,
          deleted: false,
        }));
      }, 4000);
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    setLoadingDelete(false);
  };

  const link1 = post.link?.split("www.").pop();
  const link2 = link1?.split("http://").pop();
  const db_link = link2?.split("https://").pop();

  const formattedLink =
    db_link!?.length > 16 ? db_link?.substring(0, 16) + "..." : db_link;

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
      onClick={() => onSelectPost && onSelectPost(post)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={userVoteValue === 1 ? BiUpvote : BiUpvote}
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={25}
          onClick={(e) => onVote(e, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize="10pt">{post.voteStatus}</Text>
        <Icon
          as={userVoteValue === -1 ? BiDownvote : BiDownvote}
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={25}
          onClick={(e) => onVote(e, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px">
          {error && (
            <Alert status="error" className="mt-2" width="20rem">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Stack
            direction="row"
            spacing={0.6}
            align="center"
            fontSize="10pt"
            flexWrap="wrap"
          >
            {homePage && (
              <>
                {post.communityImageURL ? (
                  <Image
                    src={post.communityImageURL}
                    alt="homepage image"
                    borderRadius="full"
                    boxSize="18px"
                    mr={2}
                  />
                ) : (
                  <Icon as={FaReddit} fontSize="18pt" mr={1} color="blue.500" />
                )}

                <Link
                  href={`r/${post.communityId}`}
                  className="hover:underline font-[700]"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >{`r/${post.communityId}`}</Link>
                <Icon as={BsDot} color="gray.500" fontSize={10} />
              </>
            )}
            <Text color="gray.500">
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontWeight={600} className="text-[20px]">
            {post.title}
          </Text>
          {post.link ? (
            <a
              href={post.link}
              className="text-[#3f9ade] hover:underline"
              target="_blank"
              rel="noreferrer"
              style={{ width: "fit-content" }}
            >
              {formattedLink}{" "}
              <span>
                <Icon as={FiExternalLink} />
              </span>
            </a>
          ) : (
            <Text fontSize="14px" className="mt-[1rem!important]">
              {post.body}
            </Text>
          )}

          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                alt="post image"
                maxHeight="460px"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>

        {/* icons */}
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={700} align="center">
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
          >
            <Icon as={BsChatSquare} mr={2} />
            <Text fontSize="10pt">{post.numberOfComments}</Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={AiOutlineGift} mr={2} />
            <Text fontSize="10pt" display={{ base: "none", lg: "block" }}>
              Award
            </Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="10pt" display={{ base: "none", lg: "block" }}>
              Share
            </Text>
          </Flex>

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="10pt" display={{ base: "none", lg: "block" }}>
              Save
            </Text>
          </Flex>

          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={AiOutlineCheckCircle} mr={2} />
            <Text
              fontSize="10pt"
              mb={1}
              display={{ base: "none", lg: "block" }}
            >
              Approve
            </Text>
          </Flex> */}

          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={IoIosRemoveCircleOutline} mr={2} />
            <Text
              fontSize="10pt"
              mb={1}
              display={{ base: "none", lg: "block" }}
            >
              Remove
            </Text>
          </Flex> */}

          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={RiSpam2Line} mr={2} />
            <Text
              fontSize="10pt"
              mb={1}
              display={{ base: "none", lg: "block" }}
            >
              Spam
            </Text>
          </Flex> */}

          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              fontSize={20}
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="10pt" display={{ base: "none", lg: "block" }}>
                    Delete
                  </Text>
                </>
              )}
            </Flex>
          )}

          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
            display={{ base: "none", md: "flex" }}
          >
            <Icon as={BsShield} mr={2} />
          </Flex> */}

          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
            fontSize={20}
          >
            <Icon as={IoIosMore} mr={2} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
