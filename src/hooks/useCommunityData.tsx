import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = useCallback(async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        snippetFetched: true,
      }));
    } catch (error: any) {
      console.log("getMySnippetError", error);
      setError(error);
    }
    setLoading(false);
  }, [user?.uid, setCommunityStateValue]);

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageUrl: communityData.imageURL || "",
        isModerator: user?.uid === communityData.creatorId,
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunityError", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
      setLoading(false);
    } catch (error: any) {
      console.log("leaveCommunityError", error);
      setError(error.message);
    }
  };

  const getCommunityData = useCallback(
    async (communityId: string) => {
      try {
        const communityDocRef = doc(firestore, "communities", communityId);
        const communityDoc = await getDoc(communityDocRef);
        setCommunityStateValue((prev) => ({
          ...prev,
          currentCommunity: {
            id: communityDoc.id,
            ...communityDoc.data(),
          } as Community,
        }));
      } catch (err) {
        console.log("fetchPost error", err);
      }
    },
    [setCommunityStateValue]
  );

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId && !communityStateValue.currentCommunity)
      getCommunityData(communityId as string);
  }, [communityStateValue.currentCommunity, getCommunityData, router.query]);

  useEffect(() => {
    if (!user) {
      return setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetFetched: false,
      }));
    }
    getMySnippets();
  }, [user, getMySnippets, setCommunityStateValue]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
    getCommunityData,
    getMySnippets,
  };
};
export default useCommunityData;
