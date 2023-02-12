import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt: Timestamp;
  imageURL?: string;
  adultContent: boolean;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageUrl?: string;
}
interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
  snippetFetched: boolean;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetFetched: false,
};
export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
