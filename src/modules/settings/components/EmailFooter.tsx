import { Button, HStack } from "@chakra-ui/react";

// TODO should set type
export const SettingsModalFooter = ({
  cancelHandler,
  submitHandler,
  mainButtonText,
  isDisabled,
  isLoading,
}) => {
  return (
    <HStack width="full">
      <Button
        size="md"
        width="86px"
        minWidth="86px"
        variant="outline"
        onClick={cancelHandler}
      >
        Cancel
      </Button>
      <Button
        isLoading={isLoading}
        size="md"
        width="full"
        isDisabled={isDisabled}
        variant="primary"
        onClick={submitHandler}
      >
        {mainButtonText}
      </Button>
    </HStack>
  );
};
