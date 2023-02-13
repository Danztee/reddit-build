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
              colorScheme="blue"
              height="35px"
              width="8rem"
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
