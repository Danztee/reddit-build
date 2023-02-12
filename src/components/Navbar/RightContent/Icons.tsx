import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { RiCoinLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";
import { AiOutlineMessage } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoFilterCircleOutline, IoMegaphoneOutline } from "react-icons/io5";

// import useDirectory from "../../../hooks/useDirectory";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
  return (
    <Flex>
      <>
        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          borderRight="1px solid"
          borderColor="gray.200"
        >
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsArrowUpRightCircle} fontSize={23} />
          </Flex>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={RiCoinLine} fontSize={23} />
          </Flex>
          <Flex
            mr={1.5}
            ml={1.5}
            padding={1}
            cursor="pointer"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={TbMessage2} fontSize={23} />
          </Flex>
        </Flex>
      </>

      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={AiOutlineMessage} fontSize={23} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoMdNotificationsOutline} fontSize={23} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize={23} />
        </Flex>
      </>
      <>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          gap={1}
          padding="5px 10px"
          cursor="pointer"
          borderRadius="50px"
          bg="gray.200"
        >
          <Icon as={IoMegaphoneOutline} fontSize={23} />{" "}
          <span className="font-bold">Advertise</span>
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
