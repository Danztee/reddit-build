import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { Community } from "../../atoms/communitiesAtom";
import { Post, postDeleted } from "../../atoms/postAtom";
import { auth, firestore } from "../../firebase/clientApp";
import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const getPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);

      //store post state
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts Error", error);
    }
    setLoading(false);
  }, [communityData.id, setPostStateValue]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postDeletedValue = useRecoilValue(postDeleted);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((post, index) => (
            <PostItem
              key={index}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}

      {postDeletedValue.deleted && (
        <div className="flex fixed bottom-[0.8rem]">
          <Alert status="success" className="mt-2" width="20rem">
            <AlertIcon />
            Post successfully deleted
          </Alert>
        </div>
      )}
    </>
  );
};
export default Posts;
