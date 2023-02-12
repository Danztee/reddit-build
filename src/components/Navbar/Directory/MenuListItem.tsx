import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineStar } from "react-icons/ai";
import useDirectory from "../../../hooks/useDirectory";

type MenuListItemProps = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory();
  return (
    <MenuItem
      width="100%"
      fontSize="12pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex align="center" width="100%" justifyContent="space-between" gap={10}>
        <Flex align="center">
          {imageURL ? (
            <Image
              src={imageURL}
              alt=""
              borderRadius="full"
              boxSize="18px"
              mr={2}
            ></Image>
          ) : (
            <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
          )}
          {displayText}
        </Flex>

        <Icon as={AiOutlineStar} fontSize={23} />
      </Flex>
    </MenuItem>
  );
};
export default MenuListItem;
