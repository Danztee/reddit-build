import { Box, Button, Flex, Icon, Image, Input, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa";

type ImageUploadProps = {
  selectedFile?: string;
  onSelectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  onSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify="center" align="center" width="100%" direction="column">
      {selectedFile ? (
        <>
          <Flex
            align="center"
            padding="10px"
            border="1px solid"
            borderColor="gray.200"
            borderRadius={4}
            width="100%"
            gap={3}
            direction="column"
          >
            <Flex gap={3} justify="flex-start" width="100%">
              <Image
                src={selectedFile}
                width="100px"
                height="100px"
                alt="img-upload"
              />

              <Box
                width="100px"
                height="100px"
                border="1px dashed"
                borderColor="gray.200"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={() => selectedFileRef.current?.click()}
              >
                <Icon
                  as={FaPlus}
                  color="gray.500"
                  fontWeight="700"
                  fontSize="15pt"
                  _hover={{ color: "black" }}
                />
              </Box>
              <input
                ref={selectedFileRef}
                type="file"
                hidden
                onChange={onSelectImage}
              />
            </Flex>

            <Flex justifyContent="space-between" width="100%" gap={4}>
              <Box padding="0 8px" bg="whitesmoke" borderRadius="4px">
                <Image
                  src={selectedFile}
                  width="300px"
                  height="300px"
                  alt="img-upload"
                />
              </Box>
              <Stack width="50%">
                <Input
                  placeholder="Add a caption..."
                  fontSize="10pt"
                  borderRadius={4}
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                />
                <Input
                  placeholder="Add a link..."
                  fontSize="10pt"
                  borderRadius={4}
                  _placeholder={{ color: "gray.500" }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                />
              </Stack>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          padding="7rem 20px"
          border="1px dashed"
          borderColor="gray.200"
          width="100%"
          borderRadius={4}
          gap={3}
        >
          <p className="text-[#0079D3]">Drag and drop images or</p>
          <Button
            variant="outline"
            height="32px"
            onClick={() => selectedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
