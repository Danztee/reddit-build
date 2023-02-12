import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Community } from "../../atoms/communitiesAtom";

type PostRulesProps = {
  communityData: Community;
};

const PostRules: React.FC<PostRulesProps> = ({ communityData }) => {
  const router = useRouter();
  return (
    <>
      {communityData && (
        <Box marginTop={4}>
          <Flex
            direction="column"
            p={2}
            color="white"
            bg="#0079D3"
            borderRadius="4px 4px 0px 0px"
          >
            <Text
              fontWeight="700"
              fontSize={
                router.pathname === "/r/[communityId]/comments/[pid]"
                  ? "16px"
                  : "12px"
              }
              p={1}
            >
              {router.pathname === "/r/[communityId]/comments/[pid]"
                ? `r/${communityData.id.toLowerCase()} Rules`
                : `R/${communityData.id.toUpperCase()} RULES`}
            </Text>
          </Flex>

          <Flex direction="column" bg="white" borderRadius="0px 0px 4px 4px">
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              width="22rem"
              fontWeight="600"
            >
              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      1. No Photoshop Created Snacks
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  If you create a forbidden snack in photoshop, it will be
                  removed. Retouching or work done to emphasize why something is
                  a forbidden snack is allowed, but animal faces on food is not.
                  Repeat offenders may be subject to bans.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      2. Posting
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        Posts must consist of an image with a relating title.
                      </ListItem>
                      <ListItem>
                        Titles should be unique and creative, but
                        &quot;forbidden (object)&quot; is acceptable, although
                        frowned upon by the mods.
                      </ListItem>
                      <ListItem>
                        Text posts are allowed but must be about the subreddit
                        or discussion relating to it.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      3. Reposting
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        Reposts will be removed at the moderators&apos;
                        discretion, including but not limited to posts with
                        duplicate titles, or is in a cluster of reposted
                        submissions.
                      </ListItem>
                      <ListItem>
                        Reposting is allowed after a period of time has passed
                        or if the original post did not receive much attention.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      4. Make it Appetizing
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        This sub is for things that you WANT to eat but
                        can&apos;t.
                      </ListItem>
                      <ListItem>
                        Please before posting, stop and ask yourself, do I want
                        to eat this? If it makes you gag, please don&apos;t post
                        it.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      5. Gross Content
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        No gore, pornography, dead animals, bodily fluids,
                        feces, etc. If you don&apos;t think &quot;huh, I want to
                        put that in my mouth&quot; then DON&apos;T post it.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      6. Personal Information
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        Revealing or posting any personal information is
                        disallowed. &quot;Doxing&quot; will result in an
                        immediate ban and report to Reddit Staff.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      7. Advertising
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        No advertising is allowed. (Unless it&apos;s for comical
                        purposes, or permitted by the moderators.)
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton p={3}>
                    <Box as="span" flex="1" textAlign="left">
                      8. Spam
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontWeight="normal">
                  <UnorderedList>
                    <Stack>
                      <ListItem>
                        Obviously this isn&apos;t allowed. Spam includes any
                        off-topic posts not related to this subreddit as well as
                        repeat posting.
                      </ListItem>
                    </Stack>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Box>
      )}
    </>
  );
};
export default PostRules;
