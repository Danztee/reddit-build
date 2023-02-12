import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../firebase/clientApp";
import useDirectory from "../../../hooks/useDirectory";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [adultContent, setAdultContent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 21) return;
    setCommunityName(e.target.value);
    setCharsRemaining(21 - e.target.value.length);
  };

  const onCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommunityType(e.target.name);
  };
  const adultContentChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAdultContent(() => !adultContent);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // validate community
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "community Name must be between 3 - 21 characters, and can contain only letters, and numbers."
      );
      return;
    }
    setLoading(true);
    try {
      // check the name is not taken
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // check if community exists in db
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityDocRef} is already taken. Try another name`
          );
        }

        // create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
          adultContent,
        });

        // create community snippet
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          { communityId: communityName, isModerator: true }
        );
      });

      handleClose();
      router.push(`r/${communityName}`);
      toggleMenuOpen();
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={11}>
                Community Names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="25px"
                left="10px"
                width="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              <Text
                color={charsRemaining === 0 ? "red" : "gray.500"}
                fontSize={12}
                mt={2}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box>
                <Text fontWeight={600} fontSize={15} mt={6} mb={2}>
                  Community Type
                </Text>
                <Stack spacing={3}>
                  <Radio
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight={600} mt={1}>
                        Public
                      </Text>
                      <Text fontSize="9pt" color="gray.500" mt={1}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight={600} mt={1}>
                        Restricted
                      </Text>
                      <Text fontSize="9pt" color="gray.500" mt={1}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Radio>
                  <Radio
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight={600} mt={1}>
                        Private
                      </Text>
                      <Text fontSize="9pt" color="gray.500" mt={1}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Radio>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
            mt={5}
          >
            Adult content
          </ModalHeader>
          <Box pl={3} pr={3} pb={6}>
            <Checkbox
              isChecked={adultContent}
              onChange={adultContentChangeHandler}
            >
              <div className="flex">
                <Text
                  border="solid 1px red"
                  color="#fff"
                  bg="red"
                  borderRadius={5}
                  mr={2}
                  fontSize="10pt"
                >
                  NSFW
                </Text>
                <Text fontSize={15} mr={1} fontWeight={600}>
                  18+ year old community
                </Text>
              </div>
            </Checkbox>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
