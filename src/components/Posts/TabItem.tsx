import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItemType } from "./NewPostForm";

type TabItemProps = {
  item: TabItemType;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      fontWeight="700"
      fontSize="14px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "#878A8C"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="#EDEFF1"
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} fontSize={20} />
      </Flex>
      <Text fontSize="10pt" className="hidden md:block">
        {item.title}
      </Text>
    </Flex>
  );
};
export default TabItem;
