import { Divider, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

const Footer = () => {
  const [user, loadingUser] = useAuthState(auth);
  return (
    <Flex
      direction="column"
      bg={user ? "white" : ""}
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border={user ? "1px solid" : ""}
      borderColor="gray.300"
      gap={4}
      fontSize="13px"
      color="gray.500"
    >
      <div className="flex justify-around gap-8">
        <div className="flex flex-col gap-2 flex-wrap w-[50%]">
          <Link href="/">User Agreement</Link>
          <Link href="/">Content Policy</Link>
        </div>

        <div className="flex flex-col gap-2 flex-wrap w-[50%]">
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Moderator Code Of conduct</Link>
        </div>
      </div>
      <Divider />
      {user && (
        <>
          <div className="flex justify-around gap-8">
            <div className="flex flex-col gap-2 flex-wrap w-[50%]">
              <Link href="/">English</Link>
              <Link href="/">Français</Link>
              <Link href="/">Italiano</Link>
            </div>
            <div className="flex flex-col gap-2 flex-wrap w-[50%]">
              <Link href="/">Deutsch</Link>
              <Link href="/">Espanol</Link>
              <Link href="/">Português</Link>
            </div>
          </div>
          <Divider />
        </>
      )}

      <h5>Reddit Inc © 2023. All rights reserved</h5>
    </Flex>
  );
};
export default Footer;
