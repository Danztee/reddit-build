import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsShield } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import { Community, communityState } from "../../atoms/communitiesAtom";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";
import useHover from "../../hooks/useHover";
import useSelectFile from "../../hooks/useSelectFile";

type AboutCommunityProps = {
  communityData: Community;
};

const AboutCommunity: React.FC<AboutCommunityProps> = ({ communityData }) => {
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  const router = useRouter();
  const { hovering, onHoverProps } = useHover();

  const onUpdateImage = async () => {
    try {
      if (!selectedFile) return;
      setUploadingImage(true);

      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error: any) {
      console.log("onUpdateImage error", error);
    }
    setUploadingImage(false);
  };

  return (
    <Box
      position="sticky"
      top={
        router.pathname === "/r/[communityId]" ||
        router.pathname === "/r/[communityId]/submit" ||
        router.pathname === "/r/[communityId]/comments/[pid]"
          ? ""
          : "3.8rem"
      }
    >
      <Flex
        justify="space-between"
        align="center"
        bg="#0079D3"
        color="white"
        p={5}
        borderRadius="4px 4px 0px 0px"
      >
        {router.pathname !== "/r/[communityId]/submit" && (
          <>
            <Text fontWeight="700" fontSize="14px">
              About Community
            </Text>

            <Flex align="center" gap="2">
              <div className="flex items-center">
                <Icon as={BsShield} mr={2} />
                <Text fontSize="9pt" fontWeight={600}>
                  MOD TOOLS
                </Text>
              </div>
              <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
          </>
        )}
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        <Stack>
          <Flex align="center" width="100%" p={1} fontWeight={500}>
            <Icon as={RiCakeLine} fontSize={20} mr={2} />
            <Text color="gray.500" pt="5px" fontSize="15px">
              Created{" "}
              {moment(new Date(communityData.createdAt.seconds * 1000)).format(
                "MMM DD, YYYY"
              )}
            </Text>
          </Flex>
          <Divider />
          <Flex width="100%" p={2} fontSize="11pt">
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={700}>
                {communityData.numberOfMembers.toLocaleString()}
              </Text>
              <Text color="gray.500">Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text fontWeight={700}>
                <span className="text-[#46d160] mr-[4px]">●</span> 2
              </Text>
              <Text color="gray.500">Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Button
            {...onHoverProps}
            variant={isJoined ? "outline" : "solid"}
            height="30px"
            pr={6}
            pl={6}
            isLoading={loading}
            onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
          >
            {hovering && isJoined ? "Leave" : isJoined ? "Joined" : "Join"}
          </Button>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3} height="30px" width="100%" fontWeight={700}>
              Create Post
            </Button>
          </Link>
          {router.pathname === "/r/[communityId]" &&
            user?.uid === communityData.creatorId && (
              <>
                <Divider />
                <Stack spacing={1} fontSize="10pt">
                  <Text fontWeight={600}>Admin</Text>
                  <Flex align="center" justify="space-between">
                    <Text
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      Change Image
                    </Text>
                    {selectedFile && (
                      <Image
                        src={selectedFile}
                        alt="selected Community Image"
                        borderRadius="full"
                        boxSize="40px"
                      />
                    )}
                  </Flex>
                  {selectedFile &&
                    (uploadingImage ? (
                      <Box textAlign="center">
                        <Spinner />
                      </Box>
                    ) : (
                      <Text
                        cursor="pointer"
                        onClick={onUpdateImage}
                        textAlign="center"
                        _hover={{ textDecoration: "underline" }}
                      >
                        save Changes
                      </Text>
                    ))}
                  <input
                    ref={selectedFileRef}
                    type="file"
                    hidden
                    onChange={onSelectFile}
                  />
                </Stack>
              </>
            )}

          <Divider />
          <Flex
            align="center"
            justifyContent="space-between"
            pt={2}
            pb={2}
            cursor="pointer"
            _hover={{ color: "black", bg: "gray.200", borderRadius: "5px" }}
          >
            <Text color="blue.500" fontWeight="700" fontSize="12pt">
              Community Options
            </Text>
            <Icon as={ChevronDownIcon} fontSize={20} color="blue.500" />
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
export default AboutCommunity;
