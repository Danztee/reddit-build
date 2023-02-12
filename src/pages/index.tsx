import { Flex, Stack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post, PostVote } from "../atoms/postAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import Footer from "../components/Footer";
import PageContent from "../components/Layout/PageContent";
import PostItem from "../components/Posts/PostItem";
import PostLoader from "../components/Posts/PostLoader";
import { auth, firestore } from "../firebase/clientApp";
import useCommunityData from "../hooks/useCommunityData";
import usePosts from "../hooks/usePosts";

const Home = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = useCallback(async () => {
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed Error", error);
    }
  }, [setPostStateValue]);

  const buildUserHomeFeed = useCallback(async () => {
    setLoading(true);

    if (communityStateValue.mySnippets.length) {
      const myCommunityIds = communityStateValue.mySnippets.map(
        (snippet) => snippet.communityId
      );

      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "in", myCommunityIds),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } else {
      buildNoUserHomeFeed();
    }
    try {
    } catch (error) {
      console.log("buildUserHomeFeed Error", error);
    }
    setLoading(false);
  }, [buildNoUserHomeFeed, communityStateValue.mySnippets, setPostStateValue]);

  const getUserPostVotes = useCallback(async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postVotesDocs = await getDocs(postVotesQuery);
      const postVotes = postVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("getUserPostVotes Error", error);
    }
  }, [postStateValue.posts, setPostStateValue, user?.uid]);

  useEffect(() => {
    if (communityStateValue.snippetFetched) buildUserHomeFeed();
  }, [buildUserHomeFeed, communityStateValue.snippetFetched]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser, buildNoUserHomeFeed]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUserPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [getUserPostVotes, postStateValue.posts.length, setPostStateValue, user]);

  return (
    <PageContent>
      <></>
      <>
        {user && <CreatePostLink />}
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
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === post.id
                  )?.voteValue
                }
                onVote={onVote}
                onSelectPost={onSelectPost}
                onDeletePost={onDeletePost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5} position="sticky" top={!user ? "3.8rem" : ""}>
        {user && (
          <>
            <Premium />
            <PersonalHome />
          </>
        )}
        <Footer />
      </Stack>
    </PageContent>
  );
};

export default Home;
