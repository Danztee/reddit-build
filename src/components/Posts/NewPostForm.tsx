import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { Post } from "../../atoms/postAtom";
import { firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";
import ImageUpload from "./PostForm/ImageUpload";
import TextInput from "./PostForm/TextInput";
import TabItem from "./TabItem";

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
    link: "",
  });

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;

    // create new post object
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || "",
      creatorId: user?.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      link: textInputs.link,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      // store the post in db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selected file
      if (selectedFile) {
        //--- store in storage
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        // update post doc by adding image URL
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }

      // redirect the user to the community page
      router.push(`/r/${communityId}`);
    } catch (error: any) {
      console.log("handleCreatePostError", error);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={4}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>

      <Flex p={4} direction="column" gap={3}>
        <Input
          name="title"
          value={textInputs.title}
          onChange={onTextChange}
          fontSize="10pt"
          _focusVisible={{
            outline: "none",
          }}
          borderRadius={4}
          placeholder="Title"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
        />

        {selectedTab === "Post" && (
          <TextInput
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}

        {selectedTab === "Images & video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}

        {selectedTab === "Link" && (
          <>
            <Textarea
              name="link"
              placeholder="Url"
              value={textInputs.link}
              onChange={onTextChange}
              fontSize="10pt"
              _focusVisible={{
                outline: "none",
              }}
              borderRadius={4}
              _placeholder={{ color: "gray.500" }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "black",
              }}
              resize="none"
            />
          </>
        )}

        <Flex justify="flex-end">
          <Button
            height="34px"
            padding="0 30px"
            isDisabled={
              (!textInputs.title && !textInputs.body) ||
              router.pathname === "/submit"
            }
            isLoading={loading}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </Flex>
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
