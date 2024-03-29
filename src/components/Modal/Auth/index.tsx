import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = useCallback(() => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  }, [setModalState]);

  useEffect(() => {
    if (user) handleClose();
    console.log(user);
  }, [user, handleClose]);

  return (
    <>
      <Modal
        isOpen={modalState.open}
        onClose={handleClose}
        size={{ base: "full", md: "lg" }}
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalState.view === "login" && "Log in"}
            {modalState.view === "signup" && "Sign Up"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent={{ md: "center" }}
            marginTop={{ base: "2rem", md: "0" }}
            pb={6}
          >
            {modalState.view === "login" && (
              <Text fontSize="9pt" mb={10} className="mt-[-1rem]">
                By continuing, you agree are setting up a Reddit account and
                agree to our{" "}
                <Link href="/" className="text-[#0079d3]">
                  User Agreement{" "}
                </Link>
                and{" "}
                <Link href="/" className="text-[#0079d3]">
                  Privacy Policy.
                </Link>
              </Text>
            )}

            {modalState.view === "signup" && (
              <Text fontSize="9pt" mb={10} className="mt-[-1rem]">
                By continuing, you are setting up a Reddit account and agree to
                our{" "}
                <Link href="/" className="text-[#0079d3]">
                  User Agreement{" "}
                </Link>
                and{" "}
                <Link href="/" className="text-[#0079d3]">
                  Privacy Policy.
                </Link>
              </Text>
            )}

            <Flex
              direction="column"
              align="center"
              justify="center"
              width={{ base: "90%", md: "70%" }}
            >
              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <div
                    className="items-center flex justify-between w-[100%]"
                    style={{
                      margin: "16px 0px 20px",
                    }}
                  >
                    <span
                      className="w-[40%] "
                      style={{
                        borderTop: "1px solid rgb(237, 239, 241)",
                      }}
                    ></span>
                    <span
                      className="text-[14px] leading-[18px] font-bold"
                      style={{
                        color: "rgb(120, 124, 126)",
                      }}
                    >
                      OR
                    </span>
                    <span
                      style={{
                        borderTop: " 1px solid rgb(237, 239, 241)",
                        width: "40%",
                      }}
                    ></span>
                  </div>
                  <AuthInputs />
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
