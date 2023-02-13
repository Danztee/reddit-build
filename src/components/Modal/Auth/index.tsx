// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
//   Flex,
//   Text,
// } from "@chakra-ui/react";
// import Link from "next/link";
// import React, { useCallback, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useRecoilState } from "recoil";
// import { authModalState } from "../../../atoms/authModalAtom";
// import { auth } from "../../../firebase/clientApp";
// import AuthInputs from "./AuthInputs";
// import OAuthButtons from "./OAuthButtons";
// import ResetPassword from "./ResetPassword";

import {
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import React from "react";

// const AuthModal: React.FC = () => {
//   const [modalState, setModalState] = useRecoilState(authModalState);
//   const [user, loading, error] = useAuthState(auth);

//   const handleClose = useCallback(() => {
//     setModalState((prev) => ({
//       ...prev,
//       open: false,
//     }));
//   }, [setModalState]);

//   useEffect(() => {
//     if (user) handleClose();
//     console.log(user);
//   }, [user, handleClose]);

//   return (
//     <>
//       <Modal
//         isOpen={modalState.open}
//         onClose={handleClose}
//         scrollBehavior="outside"
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             {modalState.view === "login" && "Log in"}
//             {modalState.view === "signup" && "Sign Up"}
//           </ModalHeader>
//           <ModalCloseButton />

//           <ModalBody
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             pb={6}
//           >
//             {modalState.view === "login" && (
//               <Text fontSize="9pt" mb={10} className="mt-[-1rem]">
//                 By continuing, you agree are setting up a Reddit account and
//                 agree to our{" "}
//                 <Link href="/" className="text-[#0079d3]">
//                   User Agreement{" "}
//                 </Link>
//                 and{" "}
//                 <Link href="/" className="text-[#0079d3]">
//                   Privacy Policy.
//                 </Link>
//               </Text>
//             )}

//             {modalState.view === "signup" && (
//               <Text fontSize="9pt" mb={10} className="mt-[-1rem]">
//                 By continuing, you are setting up a Reddit account and agree to
//                 our{" "}
//                 <Link href="/" className="text-[#0079d3]">
//                   User Agreement{" "}
//                 </Link>
//                 and{" "}
//                 <Link href="/" className="text-[#0079d3]">
//                   Privacy Policy.
//                 </Link>
//               </Text>
//             )}

//             <Flex
//               direction="column"
//               align="center"
//               justify="center"
//               width={{ base: "90%", md: "70%" }}
//             >
//               {modalState.view === "login" || modalState.view === "signup" ? (
//                 <>
//                   <OAuthButtons />
//                   <div
//                     className="items-center flex justify-between w-[100%]"
//                     style={{
//                       margin: "16px 0px 20px",
//                     }}
//                   >
//                     <span
//                       className="w-[40%] "
//                       style={{
//                         borderTop: "1px solid rgb(237, 239, 241)",
//                       }}
//                     ></span>
//                     <span
//                       className="text-[14px] leading-[18px] font-bold"
//                       style={{
//                         color: "rgb(120, 124, 126)",
//                       }}
//                     >
//                       OR
//                     </span>
//                     <span
//                       style={{
//                         borderTop: " 1px solid rgb(237, 239, 241)",
//                         width: "40%",
//                       }}
//                     ></span>
//                   </div>
//                   <AuthInputs />
//                 </>
//               ) : (
//                 <ResetPassword />
//               )}
//             </Flex>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
// export default AuthModal;

function ScrollingExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const btnRef = React.useRef(null);
  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Trigger modal
      </Button>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="outside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            facere voluptatum dicta expedita est iusto! Voluptatem facilis porro
            enim, incidunt dolorum distinctio, fugiat reiciendis pariatur
            recusandae optio aliquid iusto velit assumenda modi veniam tempora
            at facere delectus qui fuga ullam. Quibusdam corrupti tenetur
            aliquam cumque itaque alias earum iure dolor. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Dolorum, est illo. Obcaecati ea
            cupiditate, qui deleniti beatae suscipit vero aperiam, officia atque
            placeat distinctio blanditiis alias numquam et voluptatibus sint
            doloribus provident. Totam consequatur dicta deserunt, iste autem
            esse. Provident pariatur magnam facilis nostrum blanditiis eum
            voluptatum, neque cupiditate praesentium aut libero minima quisquam
            tempore, cumque quidem nulla architecto adipisci asperiores
            voluptatem, voluptas perspiciatis perferendis? Minima facilis iure
            tempora atque molestiae. Nostrum autem quam, est numquam odit sint
            magnam omnis molestiae beatae blanditiis quae unde quia laborum?
            Fugiat expedita, suscipit enim illo eveniet impedit amet! Ab nisi
            dolores aperiam eos incidunt consequatur dicta itaque eum quos
            <Input />
            exercitationem illum architecto consectetur rem corrupti assumenda
            praesentium culpa, aut modi obcaecati! Omnis error vero blanditiis
            sequi est, necessitatibus facilis rem iste magnam unde ipsum dolore
            neque eos, quia quas corrupti iusto nam earum recusandae nobis
            facere quos? Doloribus consequuntur officia, impedit cum eaque eos
            suscipit debitis fugiat laudantium esse eligendi, laboriosam iste
            saepe sed vel nihil inventore corrupti ullam repellendus! Doloribus
            sed totam sapiente id similique rerum placeat nulla repellat maiores
            laudantium exercitationem enim illo ipsum beatae voluptas molestiae,
            aspernatur quibusdam omnis atque eius minus et. Ullam assumenda enim
            eum facere obcaecati omnis.
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ScrollingExample;
