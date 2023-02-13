import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import Recommendations from "../Community/Recommendations";

type RecommendationsModalProps = {
  open: boolean;
  handleClose: () => void;
};

const RecommendationsModal: React.FC<RecommendationsModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <Recommendations />

          <ModalFooter>
            <Button
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
    </>
  );
};

export default RecommendationsModal;
