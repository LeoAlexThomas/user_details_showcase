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
import isNil from "lodash/isNil";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={["xs", "md", "lg"]}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily="Playfair Display"
          fontSize={["20px", null, "28px"]}
          fontWeight={800}
          h="60px"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bg="gray.100">{children}</ModalBody>
        {!isNil(footer) && (
          <ModalFooter h="60px" {...footerProps}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
export default CustomModal;
