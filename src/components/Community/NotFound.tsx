import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const CommunityNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      alignItems="center"
      minHeight="80vh"
    >
      <div className="h-[6rem] w-[6rem] rounded-full bg-[#a8a8a8] mb-10"></div>
      <h1 className="font-[600] text-[1.1rem] mb-4">
        Sorry, there aren’t any communities on Reddit with that name.
      </h1>
      <p className="font-[600] mb-10">
        This community may have been banned or the community name is incorrect.
      </p>

      <Flex gap={4}>
        <Link href="/">
          <Button
            variant="white"
            border="solid 1px"
            borderColor="blue.500"
            fontWeight="bold"
            color="blue.500"
            height={8}
          >
            Create Community
          </Button>
        </Link>
        <Link href="/">
          <Button fontWeight="bold" height={8}>
            GO HOME
          </Button>
        </Link>
      </Flex>

      <footer>
        <p className="text-[10pt] text-[#878A8C] text-center mt-10 md:w-[33rem] font-[500]">
          Use of this site constitutes acceptance of our{" "}
          <span className="underline cursor-pointer">User Agreement</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy.</span>{" "}
          ©2023 reddit inc. All rights reserved. REDDIT and the ALIEN Logo are
          registered trademarks of reddit inc.
        </p>
      </footer>
    </Flex>
  );
};
export default CommunityNotFound;
