import {
  GridItem,
  HStack,
  Img,
  Tag,
  TagLabel,
  Text,
  VStack
} from "@chakra-ui/react";
import { interestsFakeData } from "@/constant";
import { useFormContext, useWatch } from "react-hook-form";
import { SetupWizardForm } from "@/types";
import { useEffect } from "react";
import { WizardContentBase } from "./Base";
import { InputError } from "../InputError";

export const Interests = () => {
  const {
    setError,
    clearErrors,
    setValue,
    control,
    formState: { errors }
  } = useFormContext<SetupWizardForm>();

  const { interests } = useWatch({ control });

  useEffect(() => {
    if (interests.length === 0) {
      setError("interests", { message: "You should select at least one tag." });
    } else {
      clearErrors("interests");
    }
  }, [interests]);

  return (
    <WizardContentBase>
      <GridItem as={VStack} justifyContent="center" alignItems="center">
        <Img
          width="288px"
          height="288px"
          src="/assets/images/setupWizard/marketing.png"
          alt="blockchain wizard"
        />
      </GridItem>
      <GridItem>
        <Text
          mr="auto"
          color="gray.0"
          fontFamily="lexend"
          fontSize="xl"
          fontWeight="600"
        >
          Select Your Interests
        </Text>
        <Text fontSize="md" color="gray.0">
          Choose your interests by selecting relevant tags. This will help us
          personalize your experience and connect you with like-minded users.
        </Text>
        <HStack flexWrap="wrap" gap="8px" mt="16px">
          {interestsFakeData.map((item) => (
            <Tag
              cursor="pointer"
              onClick={() => {
                const index = interests.findIndex((tag) => tag === item.id);

                if (index !== -1) {
                  setValue(
                    "interests",
                    interests.filter((tag) => tag !== item.id)
                  );
                } else {
                  setValue("interests", [...interests, item.id]);
                }
              }}
              size="md"
              variant={interests.includes(item.id) ? "lightOrange" : "dark"}
              key={item.id}
            >
              <TagLabel>{item.title}</TagLabel>
            </Tag>
          ))}
        </HStack>
        {!!errors.interests && (
          <InputError errorMessage={errors.interests.message} />
        )}
      </GridItem>
    </WizardContentBase>
  );
};
