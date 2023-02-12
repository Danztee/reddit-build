import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        borderRadius={4}
        _hover={{
          outline: "1px solid",
          outlineColor: "gray.200",
        }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justifyContent="space-between"
          width={{ base: "11rem", lg: "16rem" }}
        >
          <Flex align="center">
            {/* {router.pathname === "/" && (
              <>
                <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={AiFillHome} />
                <Text>Home</Text>
              </>
            )} */}
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt=""
                borderRadius="full"
                boxSize="24px"
                mr={2}
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}

            <Flex>
              <Text fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon fontSize={24} color="#a8aaab" mt={1} />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
