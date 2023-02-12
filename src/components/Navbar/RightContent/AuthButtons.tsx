import React from "react";
import { Button } from "@chakra-ui/react";

import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useRouter } from "next/router";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant="outline"
        height="32px"
        display={{
          base: "none",
          sm: "flex",
        }}
        width={{
          base: "70px",
          sm: "120px",
        }}
        mr={2}
        onClick={() => {
          setAuthModalState({ open: true, view: "getApp" });
        }}
      >
        Get App
      </Button>

      <Button
        height="32px"
        display={{
          base: "none",
          sm: "flex",
        }}
        width={{
          base: "70px",
          sm: "120px",
        }}
        mr={2}
        onClick={() => {
          setAuthModalState({ open: true, view: "login" });
        }}
      >
        Log In
      </Button>
    </>
  );
};
export default AuthButtons;
