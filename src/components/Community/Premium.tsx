import React from "react";
import { Flex, Icon, Text, Stack, Button } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";

const Premium: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        <Icon as={GiCheckedShield} fontSize={26} color="brand.100" mt={2} />
        <Stack pl={2}>
          <Text fontWeight={600} fontSize="12pt">
            Reddit Premium
          </Text>
          <Text fontSize="10pt">
            The best Reddit experience, with monthly Coins
          </Text>
        </Stack>
      </Flex>
      <Button height="40px" bg="brand.100" _hover={{ bg: "brand.100" }}>
        Try Now
      </Button>
    </Flex>
  );
};
export default Premium;
