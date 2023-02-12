import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step !== 2) return setStep((prev) => prev + 1);
    try {
      createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update form state
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <form onSubmit={onSubmitHandler}>
      {step === 1 && (
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
      )}
      {/* <Input
        required
        name="username"
        placeholder="Username"
        type="text"
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
      /> */}
      {step === 2 && (
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
      )}
      {error && (
        <Text align="center" color="red" fontSize="10pt">
          {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}
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
        Continue
      </Button>
      <Flex fontSize="9pt" justifyContent="center" gap="0.5rem">
        <Text>Already a redditor?</Text>
        <Text
          color="#0079d3"
          fontWeight="700"
          cursor="pointer"
          textDecoration="underline"
          onClick={() => {
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }));
          }}
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
