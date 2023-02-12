import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { BsMoon } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { FaRedditSquare } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const signOutHandler = async () => {
    signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        borderRadius={4}
        _hover={{
          outline: "1px solid",
          outlineColor: "gray.200",
        }}
      >
        {user ? (
          <Flex align="center">
            <Flex align="center" mr={2}>
              <>
                {user?.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName as string}
                    borderRadius={4}
                    height="2rem"
                    mr={2}
                  />
                ) : (
                  <Icon
                    fontSize={24}
                    color="#a8aaab"
                    as={FaRedditSquare}
                    mr={2}
                  />
                )}

                <div className="mr-10 text-start hidden xl:block">
                  <p className="text-[#1c1c1c] font-[600] ">
                    {user?.displayName?.slice(0, 10) ||
                      user?.email?.split("@")[0]}
                  </p>
                  <Flex align="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <span className="text-[12px] text-[#a8aaab] font-bold">
                      1 karma
                    </span>
                  </Flex>
                </div>
              </>
              <ChevronDownIcon fontSize={24} color="#a8aaab" />
            </Flex>
          </Flex>
        ) : (
          <>
            <Icon fontSize={24} color="gray.400" mr={1} as={CiUser} />
            <ChevronDownIcon fontSize={24} color="#a8aaab" mr={4} mt={1} />
          </>
        )}
      </MenuButton>

      {user ? (
        <MenuList>
          <div id="profile">
            <Flex align="center" color="#878A8C" fontWeight={700} ml={5}>
              <Icon as={CgProfile} fontSize={20} mr={2} />
              <Text>My Stuffs</Text>
            </Flex>
            <div className="text-[#1c1c1c] font-[700] mt-2 ">
              <MenuItem justifyContent="space-between">
                <Text className="pl-10">Online Status</Text>
                <label
                  className="switch"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </MenuItem>
              <MenuItem>
                <Text className="pl-10">Profile</Text>
              </MenuItem>
              <MenuItem>
                <Text className="pl-10">Create Avatar</Text>
              </MenuItem>
              <MenuItem>
                <Text className="pl-10">User Settings</Text>
              </MenuItem>
            </div>
          </div>

          <MenuDivider />

          <div id="view">
            <Flex align="center" color="#878A8C" fontWeight={700} ml={5}>
              <Icon as={GrView} fontSize={20} mr={2} />
              <Text>View Options</Text>
            </Flex>
            <div className="text-[#1c1c1c] font-[700] mt-2 ">
              <MenuItem justifyContent="space-between">
                <Text className="pl-10">Dark Mode</Text>

                <label
                  className="switch"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </MenuItem>
            </div>
          </div>

          <MenuDivider />

          <MenuItem onClick={signOutHandler}>
            <Flex fontWeight={700} ml={5}>
              <Icon
                as={MdOutlineLogin}
                fontSize={20}
                mr={4}
                className="ml-[-1rem]"
              />
              <Text>Log Out</Text>
            </Flex>
          </MenuItem>

          <p className="text-[11px] text-center pt-4 pb-4 text-[#878A8C]">
            © 2023 Daniel, Inc. All rights reserved
          </p>
        </MenuList>
      ) : (
        <MenuList>
          <div className="text-[#1c1c1c] font-[500] mt-2">
            <MenuItem justifyContent="space-between">
              <div className="flex">
                <Icon as={BsMoon} fontSize={20} mr={3} />
                <Text>Dark Mode</Text>
              </div>
              <label
                className="switch"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </MenuItem>
          </div>
          <MenuDivider />
          <MenuItem
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex fontWeight={500} ml={5}>
              <Icon
                as={MdOutlineLogin}
                fontSize={20}
                mr={3}
                className="ml-[-1rem]"
              />
              <Text>Log In / Sign Up</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  );
};
export default UserMenu;
