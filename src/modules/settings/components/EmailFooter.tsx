import { Button, HStack } from "@chakra-ui/react";

export const SettingsModalFooter = ({
  cancelHandler,
  submitHandler,
  mainButtonText,
  isDisabled,
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
