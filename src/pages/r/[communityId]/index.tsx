import { async } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import AboutCommunity from "../../../components/Community/AboutCommunity";
import About from "../../../components/Community/AboutCommunity";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Header from "../../../components/Community/Header";
import CommunityNotFound from "../../../components/Community/NotFound";
import PageContent from "../../../components/Layout/PageContent";
import Posts from "../../../components/Posts";
import PostRules from "../../../components/Posts/PostRules";
import { firestore } from "../../../firebase/clientApp";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData, setCommunityStateValue]);

  if (!communityData) return <CommunityNotFound />;

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <></>

        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <AboutCommunity communityData={communityData} />
          <PostRules communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideError", error);
  }
}
export default CommunityPage;
