import {
  GridItem,
  HStack,
  Img,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack
} from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { SetupWizardForm } from "@/types";
import { useEffect, useState } from "react";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
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

  const [isLoading, setIsLoading] = useState(false);
  const [interestsData, setInterestsData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .post(apiKeys.fetch, {
        0: {
          model: "ProjectCategory",
          model_id: "None",
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*"
              }
            ]
          }
        }
      })
      .then((res) => {
        setInterestsData(res.data[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
          {isLoading ? (
            <Spinner color="primary.300" />
          ) : (
            interestsData.map((item) => (
              <Tag
                cursor="pointer"
                onClick={() => {
                  const index = interests.findIndex((tag) => tag === item.id);

                  if (index !== -1) {
                    setValue(
                      "interests",
                      interests.filter((tag) => tag.id !== item.id)
                    );
                  } else {
                    setValue("interests", [...interests, item]);
                  }
                }}
                size="md"
                variant={
                  interests.find((interest) => interest.id === item.id)
                    ? "lightOrange"
                    : "dark"
                }
                key={item.id}
              >
                <TagLabel>{item.name}</TagLabel>
              </Tag>
            ))
          )}
        </HStack>
        {!!errors.interests && (
          <InputError errorMessage={errors.interests.message} />
        )}
      </GridItem>
    </WizardContentBase>
  );
};
