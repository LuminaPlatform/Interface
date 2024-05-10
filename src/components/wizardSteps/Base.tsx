import { SimpleGrid } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface WizardContentBaseProps extends PropsWithChildren {}
export const WizardContentBase = ({ children }: WizardContentBaseProps) => (
  <SimpleGrid gap="24px" columns={{ base: 1, md: 2 }}>
    {children}
  </SimpleGrid>
);
