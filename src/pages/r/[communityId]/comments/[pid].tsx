import { Box } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "../../../../atoms/postAtom";
import AboutCommunity from "../../../../components/Community/AboutCommunity";
import PageContent from "../../../../components/Layout/PageContent";
import Comments from "../../../../components/Posts/Comments";
import PostItem from "../../../../components/Posts/PostItem";
import PostRules from "../../../../components/Posts/PostRules";
import { auth, firestore } from "../../../../firebase/clientApp";
import useCommunityData from "../../../../hooks/useCommunityData";
import usePosts from "../../../../hooks/usePosts";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();

  const { communityStateValue } = useCommunityData();

  const router = useRouter();

  const fetchPost = useCallback(
    async (postId: string) => {
      try {
        const postDocRef = doc(firestore, "posts", postId);
        const postDoc = await getDoc(postDocRef);
        setPostStateValue((prev) => ({
          ...prev,
          selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
        }));
      } catch (err) {
        console.log("fetchPost error", err);
      }
    },
    [setPostStateValue]
  );

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue.selectedPost) fetchPost(pid as string);
  }, [router.query, postStateValue.selectedPost, fetchPost]);

  return (
    <PageContent>
      <></>

      {postStateValue.selectedPost && (
        <>
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (post) => post.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          />

          <Comments
            user={user as User}
            selectedPost={postStateValue.selectedPost}
            communityId={postStateValue.selectedPost?.communityId as string}
          />
        </>
      )}

      <>
        {communityStateValue.currentCommunity && (
          <>
            <AboutCommunity
              communityData={communityStateValue.currentCommunity}
            />

            <PostRules communityData={communityStateValue.currentCommunity} />
          </>
        )}
      </>
    </PageContent>
  );
};
export default PostPage;
