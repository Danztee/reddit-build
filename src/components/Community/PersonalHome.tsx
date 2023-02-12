import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CreateCommunityModal from "../Modal/CreateCommunityModal";

const PersonalHome: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />

      <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
        position="sticky"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="blue.500"
          height="34px"
          borderRadius="4px 4px 0px 0px"
          fontWeight={600}
          bgImage="url(/images/redditPersonalHome.png)"
          backgroundSize="cover"
        ></Flex>
        <Flex direction="column" p="12px">
          <Flex align="center" mb={2}>
            <Box
              display="inline-block"
              bg="url(/images/reddit-baby.png)"
              backgroundSize="cover"
              position="relative"
              height="68px"
              width="40px"
              fontSize={50}
              color="brand.100"
              mr={2}
              top={-5}
            ></Box>
            <Text fontWeight={600}>Home</Text>
          </Flex>
          <Stack spacing={3}>
            <Text fontSize="12pt">
              Your personal Reddit frontpage. Come here to check in with your
              favorite communities.
            </Text>
            <Divider />
            <Button height="35px" onClick={() => router.push(`/submit`)}>
              Create Post
            </Button>
            <Button
              variant="outline"
              height="35px"
              onClick={() => setOpen(true)}
            >
              Create Community
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
export default PersonalHome;
