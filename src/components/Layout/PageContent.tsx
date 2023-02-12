import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const router = useRouter();
  console.log();

  router.pathname === "/r/[communityId]/comments/[pid]" ? "" : "";
  return (
    <>
      <Flex justify="center" padding="16px 0px">
        {/* <Flex
      
          direction="column"
          mr={{ base: 0, md: 6 }}
          width={{ base: "100%", md: "15rem" }}
          display={{ base: "none", md: "flex" }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex> */}

        {/*  */}
        <Flex
          width="95%"
          maxWidth="1200px"
          justify="center"
          // className={
          //   router.pathname === "/r/[communityId]/comments/[pid]"
          //     ? "p-[2rem] bg-[#DAE0E6] sticky overflow-y-scroll h-[100%]"
          //     : ""
          // }
        >
          <Flex
            width={{ base: "100%", lg: "69%" }}
            mr={{ base: 0, lg: 6 }}
            direction="column"
          >
            {children && children[1 as keyof typeof children]}
          </Flex>
          <Flex
            direction="column"
            display={{ base: "none", lg: "flex" }}
            maxWidth="21.5rem"
            marginTop={
              router.pathname === "/r/[communityId]/submit" ? "4rem" : ""
            }
          >
            {children && children[2 as keyof typeof children]}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
export default PageContent;
