import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import AboutCommunity from "../../../components/Community/AboutCommunity";
import PageContent from "../../../components/Layout/PageContent";
import CreateCommunityModal from "../../../components/Modal/CreateCommunityModal";
import NewPostForm from "../../../components/Posts/NewPostForm";
import PostRules from "../../../components/Posts/PostRules";
import { auth } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue, getCommunityData, getMySnippets } =
    useCommunityData();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const routeClick = (communityId: string) => {
    router.push(`/r/${communityId}/submit`);
    getCommunityData(communityId);
  };

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <PageContent>
        <></>
        <>
          <Flex
            align="center"
            justifyContent="space-between"
            borderBottom="solid 1px"
            borderColor="white"
            marginTop="1.5rem"
          >
            <Box padding="14px 0">
              <Text color="#1c1c1c" fontSize="19px" fontWeight="bold">
                Create a post
              </Text>
            </Box>

            <Button
              display="flex"
              gap={2}
              bg="transparent"
              _hover={{ bg: "rgba(135,138,140,0.2)" }}
            >
              <Text color="#014980" fontWeight="bold">
                DRAFTS
              </Text>{" "}
              <Text bg="#878A8C" p="3px" color="#fff" borderRadius="4px">
                0
              </Text>
            </Button>
          </Flex>

          <Flex mt={4}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width="20rem"
                borderRadius="0"
                bg="#fff"
                color="black"
                _hover={{ bg: "#fff" }}
                onClick={() => getMySnippets()}
              >
                <Flex align="center">
                  {communityStateValue.currentCommunity?.imageURL ? (
                    <Image
                      src={communityStateValue.currentCommunity.imageURL}
                      alt=""
                      borderRadius="full"
                      boxSize="24px"
                      mr={2}
                    />
                  ) : (
                    <Icon
                      fontSize={24}
                      mr={{ base: 1, md: 2 }}
                      as={FaReddit}
                      color="blue.500"
                    />
                  )}
                </Flex>
                <Flex>
                  <Text>
                    {communityStateValue.currentCommunity &&
                      `r/${communityStateValue.currentCommunity.id}`}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList p={4} maxHeight="25rem" overflow="scroll">
                <Flex gap="4.8rem" paddingBottom={2} paddingTop={2}>
                  <Text color="gray.500" fontWeight={700}>
                    Your communities
                  </Text>

                  <Text
                    color="#0079D3"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() => setOpen(true)}
                  >
                    Create New
                  </Text>
                </Flex>
                {communityStateValue.mySnippets.map((snippet, index) => (
                  <MenuItem
                    key={index}
                    paddingLeft={0}
                    paddingBottom={2}
                    paddingTop={3}
                    onClick={() => routeClick(snippet.communityId)}
                  >
                    <Flex align="center" gap={6}>
                      {snippet.imageUrl ? (
                        <Image
                          src={snippet.imageUrl}
                          alt={snippet.communityId}
                          borderRadius="full"
                          boxSize="30px"
                        ></Image>
                      ) : (
                        <Icon as={FaReddit} fontSize={30} color="blue.500" />
                      )}
                      <Text
                        fontSize="11pt"
                        fontWeight={700}
                      >{`r/${snippet.communityId}`}</Text>
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>

          <Box bg="white" borderRadius="4px" p={2} mt={2}>
            <Text>
              1. Please do not post gore or bodily fluids. No one finds that
              appetizing (hopefully..) 2. No blatantly photoshopped posts. This
              rule mainly applies to uncreative/low-effort posts like sticking a
              dog&apos;s face on a waffle, so we&apos;re very lenient with it.
              3. Reposts will be automatically flagged and removed by a bot.
            </Text>
          </Box>

          {user && (
            <NewPostForm
              user={user}
              communityImageURL={communityStateValue.currentCommunity?.imageURL}
            />
          )}
        </>
        <>
          {communityStateValue.currentCommunity && (
            <>
              <AboutCommunity
                communityData={communityStateValue.currentCommunity}
              />

              <PostRules communityData={communityStateValue.currentCommunity} />

              {/* posting to reddit */}
              <Box marginTop={4}>
                <Flex direction="column" p={3} bg="white" borderRadius="4px">
                  <Text fontWeight="700" fontSize="17px" p="0.7rem 0">
                    Posting to Reddit
                  </Text>
                  <Divider />

                  <Stack fontWeight={600} fontSize="15px" width="100%" p={2}>
                    <Text>1. Remember the human</Text>
                    <Divider />
                    <Text>2. Behave like you would in real life</Text>
                    <Divider />
                    <Text>3. Look for the original source of content</Text>
                    <Divider />
                    <Text>4. Search for duplicates before posting</Text>
                    <Divider />
                    <Text>5. Read the community’s rules</Text>
                  </Stack>
                </Flex>
              </Box>
            </>
          )}

          <h4 className="mt-5 text-[gray]">
            Please be mindful of reddit&apos;s{" "}
            <span className="text-[#0079D3]">content policy</span> <br /> and
            practice good <span className="text-[#0079D3]">reddiquette.</span>
          </h4>
        </>
      </PageContent>
    </>
  );
};
export default SubmitPostPage;
