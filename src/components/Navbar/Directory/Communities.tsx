import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHome } from "react-icons/bi";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { TiHome } from "react-icons/ti";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import CreateCommunityModal from "../../Modal/CreateCommunityModal";
import MenuListItem from "./MenuListItem";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const mySnippet = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box>
        <Text pl={3} mb={1} fontSize="9pt" color="gray.500">
          FEEDS
        </Text>
        <MenuItem onClick={() => router.push("/")}>
          <Flex
            align="center"
            width="100%"
            fontSize="11pt"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={TiHome} fontSize={22} mr={2} />
            <Text mt={1}> Home</Text>
          </Flex>
        </MenuItem>
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="9pt" color="gray.500">
          MODERATING
        </Text>
        {mySnippet
          .filter((snippet) => snippet.isModerator)
          .map((snippet, index) => (
            <MenuListItem
              key={index}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="blue.500"
              imageURL={snippet.imageUrl}
            />
          ))}
      </Box>
      <Flex direction="column" gap={2} mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="9pt" color="gray.500">
          YOUR COMMUNITIES
        </Text>
        <MenuItem onClick={() => setOpen(true)}>
          <Flex
            align="center"
            width="100%"
            fontSize="11pt"
            _hover={{ bg: "gray.100" }}
          >
            <Icon as={GrAdd} fontSize={22} mr={2} />
            Create Community
          </Flex>
        </MenuItem>

        {mySnippet.map((snippet, index) => (
          <MenuListItem
            key={index}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="brand.100"
            imageURL={snippet.imageUrl}
          />
        ))}
      </Flex>
    </>
  );
};
export default Communities;
