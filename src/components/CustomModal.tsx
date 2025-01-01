import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalFooterProps,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { isNil } from "lodash";
const CustomModal = ({
  isOpen,
  onClose,
  title,
  footer,
  children,
  footerProps,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: React.ReactNode;
  footerProps?: ModalFooterProps;
  children: React.ReactNode;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily="Playfair Display"
          fontSize={["20px", null, "28px"]}
          fontWeight={800}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {!isNil(footer) && <ModalFooter {...footerProps}>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
export default CustomModal;
