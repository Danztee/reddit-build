import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Recommendations from "../Community/Recommendations";

type RecommendationsModalProps = {
  open: boolean;
  handleClose: () => void;
};

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  open,
  handleClose,
}) => {
  const [user, loadingUser] = useAuthState(auth);

  return (
    <>
      {user && (
        <Modal isOpen={open} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <Recommendations />

            <ModalFooter pr={0}>
              <Button
                mr={3}
                bg="red"
                _hover={{ bg: "red" }}
                height="30px"
                width="7rem"
                onClick={handleClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default RecommendationsModal;
