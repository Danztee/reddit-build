import { Button, Flex, Spinner, Stack } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post, PostVote } from "../atoms/postAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import Footer from "../components/Footer";
import PageContent from "../components/Layout/PageContent";
import RecommendationsModal from "../components/Modal/RecommendationsModal";
import PostItem from "../components/Posts/PostItem";
import PostLoader from "../components/Posts/PostLoader";
import { auth, firestore } from "../firebase/clientApp";
import useCommunityData from "../hooks/useCommunityData";
import usePosts from "../hooks/usePosts";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();

  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = useCallback(async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc")
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
    setLoading(false);
    setPageLoading(false);
  }, [setPostStateValue]);

  const handleClick = async () => {
    buildNoUserHomeFeed();
  };

  const buildUserHomeFeed = useCallback(async () => {
    setLoading(true);

    if (communityStateValue.mySnippets.length) {
      const myCommunityIds = communityStateValue.mySnippets.map(
        (snippet) => snippet.communityId
      );

      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "in", myCommunityIds),
        limit(20)
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
    setPageLoading(false);
  }, [buildNoUserHomeFeed, communityStateValue.mySnippets, setPostStateValue]);

  const getUserPostVotes = useCallback(async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id).slice(0, 10);
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

  useEffect(() => {
    if (!pageLoading)
      setTimeout(() => {
        setOpen(true);
      }, 3000);
  }, [pageLoading]);

  // function isBottom(el) {
  //   if (!el) return null;
  //   return el.getBoundingClientRect().bottom <= window.innerHeight;
  // }

  // const trackScrolling = useCallback(async () => {
  //   const wrappedElement = document.getElementById("header");
  //   if (isBottom(wrappedElement)) {
  //     console.log("header bottom reached");
  //     // document.removeEventListener("scroll", trackScrolling);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("scroll", trackScrolling);
  // }, [trackScrolling]);

  if (pageLoading)
    return (
      <Flex justifyContent="center" alignItems="center" height="30vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
        />
      </Flex>
    );

  return (
    <>
      <RecommendationsModal open={open} handleClose={() => setOpen(false)} />
      <PageContent>
        <></>
        <>
          {user && <CreatePostLink />}
          {loading ? (
            <PostLoader />
          ) : (
            <div id="header">
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
            </div>
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
    </>
  );
};

export default Home;
