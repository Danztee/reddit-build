import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import SignUp from "./SignUp";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <>
      <Text
        fontWeight={600}
        mb={1}
        fontSize="1.2rem"
        className="text-start w-[100%]"
      >
        Reset your password
      </Text>

      {success ? (
        <p className="mb-4 text-[green]">Check your email :)</p>
      ) : (
        <>
          <p className="text-[12px] mb-5 text-start">
            Tell us the email address associated with your Reddit account, and
            we’ll send you an email with a link to reset your password.
          </p>
          <form onSubmit={onSubmitHandler} className="w-[100%]">
            <Input
              required
              name="email"
              placeholder="Email"
              type="email"
              mb={2}
              onChange={(e) => setEmail(e.target.value)}
              fontSize="11pt"
              _placeholder={{
                color: "gray.500",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "#e0e0e0",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                borderColor: "#e0e0e0",
              }}
              _focusVisible={{ outline: "none" }}
              bg="#f6f7f8"
              borderRadius="50px"
              outline="none"
              height="2.8rem"
              fontWeight="bold"
              border="none"
            />
            <Text textAlign="center" color="red" fontSize="10pt">
              {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
              width="100%"
              height="40px"
              fontWeight="700"
              mt={2}
              mb={4}
              bg="#d93a00"
              type="submit"
              _hover={{
                bg: "#d93a00",
              }}
              isLoading={sending}
            >
              Reset password
            </Button>
          </form>

          <Text className="text-start text-[12px] mb-5">
            Don&apos;t have an email or need assistance logging in?{" "}
            <span className="text-[#0079d3] underline font-bold">Get Help</span>
          </Text>

          <Flex fontSize="9pt" gap="0.5rem" textAlign="start" width="100%">
            <p
              className="text-[#0079d3] underline font-[700] cursor-pointer"
              onClick={() => {
                setAuthModalState((prev) => ({
                  ...prev,
                  view: "signup",
                }));
              }}
            >
              Sign Up
            </p>
            <span className="text-[#0079d3]">•</span>
            <p
              className="text-[#0079d3] underline font-[700] cursor-pointer"
              onClick={() => {
                setAuthModalState((prev) => ({
                  ...prev,
                  view: "login",
                }));
              }}
            >
              Log In
            </p>
          </Flex>
        </>
      )}
    </>
  );
};
export default Login;
