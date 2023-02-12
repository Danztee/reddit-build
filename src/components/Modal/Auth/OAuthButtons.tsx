import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userGoogle, loadingGoogle, errorGoogle] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] =
    useSignInWithFacebook(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userGoogle) {
      createUserDocument(userGoogle.user);
    }
  }, [userGoogle]);

  useEffect(() => {
    if (userFacebook) {
      createUserDocument(userFacebook.user);
    }
  }, [userFacebook]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        height="40px"
        justifyContent="start"
        gap="3rem"
        color="gray.600"
        mb={4}
        isLoading={loadingGoogle}
        onClick={() => signInWithGoogle()}
        style={{
          justifyContent: loadingGoogle ? "center" : "",
        }}
      >
        <Image src="/images/googlelogo.png" height="20px" alt="google" />
        <p> Continue with Google</p>
      </Button>
      <Button
        variant="oauth"
        height="40px"
        justifyContent="start"
        gap="3rem"
        color="gray.600"
        isLoading={loadingFacebook}
        onClick={() => signInWithFacebook()}
        style={{
          justifyContent: loadingFacebook ? "center" : "",
        }}
      >
        <Image src="/images/facebook.png" height="20px" alt="facebook" />
        <p>Continue with Facebook</p>
      </Button>
      {/* {(errorGoogle || errorApple) && (
        <Text align="center" color="red" fontSize="10pt">
          {errorGoogle?.message || errorApple?.message}
        </Text>
      )} */}
    </Flex>
  );
};
export default OAuthButtons;
