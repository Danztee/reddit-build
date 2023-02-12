import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update form state
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChangeHandler}
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
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChangeHandler}
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

      <Text fontSize="10pt" mb={3}>
        Forget your{" "}
        <span className="text-[#0079d3] font-bold cursor-pointer">
          username
        </span>{" "}
        or{" "}
        <span
          className="text-[#0079d3] font-bold cursor-pointer"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }));
          }}
        >
          password
        </span>{" "}
        ?
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
        isLoading={loading}
      >
        Log In
      </Button>

      <Flex fontSize="9pt" justifyContent="center" gap="0.5rem">
        <Text>New To Reddit?</Text>
        <Text
          color="#0079d3"
          fontWeight="700"
          cursor="pointer"
          textDecoration="underline"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }));
          }}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
