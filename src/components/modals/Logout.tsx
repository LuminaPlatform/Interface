import {
  Button,
  HStack,
  Text,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { ModalBase } from "../ModalBase";
import { ModalHeader } from "../ModalHeader";
import { useDispatchModalSteps, useLogout } from "@/hooks/bases";
import { STEP_MODAL } from "@/types";

interface LogoutBodyProps {
  onClose: UseDisclosureProps["onClose"];
}
const LogoutBody = ({ onClose }: LogoutBodyProps) => {
  const handleClose = useLogout();
  const dispatchSteps = useDispatchModalSteps();

  return (
    <VStack width="full">
      <Text color="gray.0" fontSize="lg">
        Are you sure you want to log out of Lumina?
      </Text>
      <HStack mt="24px" columnGap="16px" width="full">
        <Button onClick={onClose} flex={1} variant="outline" size="md">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose();
            onClose();
            dispatchSteps(STEP_MODAL.wallet);
          }}
          flex={1}
          variant="primary"
          size="md"
        >
          Log out
        </Button>
      </HStack>
    </VStack>
  );
};
interface LogoutProps extends UseDisclosureProps {}
export const Logout = ({ isOpen, onClose }: LogoutProps) => {
  return (
    <ModalBase
      modalHeader={<ModalHeader text="Log Out" />}
      size="sm"
      isOpen={isOpen}
      modalBody={<LogoutBody onClose={onClose} />}
      onClose={onClose}
      showCloseButton={false}
    />
  );
};
