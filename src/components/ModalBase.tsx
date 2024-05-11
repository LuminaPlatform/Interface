import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  UseDisclosureProps,
} from "@chakra-ui/react";

type ModalBaseProps = {
  onClose: UseDisclosureProps["onClose"];
  isOpen: UseDisclosureProps["isOpen"];
  modalBody: JSX.Element;
  modalFooter?: JSX.Element;
  modalHeader?: JSX.Element;
  size?: ModalProps["size"];
  closeOnEsc?: ModalProps["closeOnEsc"];
  showCloseButton?: boolean;
};
export const ModalBase = ({
  modalBody,
  isOpen,
  modalFooter,
  modalHeader,
  onClose,
  size,
  showCloseButton = true,
  closeOnEsc,
}: ModalBaseProps) => {
  if (isOpen && onClose) {
    return (
      <Modal
        closeOnEsc={closeOnEsc}
        size={size}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          minWidth="fit-content"
          fontFamily="satoshi"
          bg="gray.900"
          padding="16px"
          position='relative'
        >
          {modalHeader && <ModalHeader pb="0">{modalHeader}</ModalHeader>}
          {showCloseButton && (
            <ModalCloseButton
              color="gray.0"
              right="16px"
              top="16px"
              width="24px"
              height="24px"
            />
          )}
          <ModalBody padding="0px" pt="20px !important">
            {modalBody}
          </ModalBody>

          {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
        </ModalContent>
      </Modal>
    );
  }
  return null;
};
