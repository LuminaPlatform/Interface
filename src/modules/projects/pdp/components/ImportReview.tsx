import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  SkeletonCircle,
  SkeletonText,
  Text,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { useForm, useWatch } from "react-hook-form";
import { InputError } from "@/components/InputError";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { ImportedReviewBox } from "./ImportedReviewBox";

enum IMPORT_REVIEW_STEP {
  importForm = "importForm",
  preview = "preview",
  review = "review"
}
interface PreviewProps {
  setStep: Dispatch<SetStateAction<IMPORT_REVIEW_STEP>>;
}
const Preview = ({ setStep }: PreviewProps) => {
  useEffect(() => {
    setTimeout(() => {
      setStep(IMPORT_REVIEW_STEP.review);
    }, 1500);
  }, []);
  return (
    <VStack rowGap="16px" width="full">
      <VStack>
        <Text fontFamily="lexend" fontSize="xl" color="gray.0">
          Generating Tweet Preview...
        </Text>
        <Text fontSize="md" color="gray.0">
          Great! Your URL is valid. Hang tight while we fetch the preview...
        </Text>
      </VStack>
      <Box bg="gray.600" width="full" borderRadius="12px" padding="14px 16px">
        <HStack columnGap="8px">
          <SkeletonCircle
            startColor="rgba(255,255,255,0.2)"
            endColor="rgba(255,255,255,0.1)"
            boxSize="24px"
          />
          <SkeletonText
            startColor="rgba(255,255,255,0.2)"
            endColor="rgba(255,255,255,0.1)"
            width="75px"
            noOfLines={1}
            skeletonHeight="16px"
          />
        </HStack>
        <SkeletonText
          startColor="rgba(255,255,255,0.2)"
          endColor="rgba(255,255,255,0.1)"
          mt="12px"
          noOfLines={2}
          spacing="8px"
          skeletonHeight="16px"
        />
      </Box>
    </VStack>
  );
};

interface ImportReviewProps {
  onClose: UseDisclosureProps["onClose"];
}
export const ImportReview = ({ onClose }: ImportReviewProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm<{
    link: string;
  }>({ mode: "all" });

  const { link } = useWatch({ control });

  const [post, setPost] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(IMPORT_REVIEW_STEP.importForm);

  const postId = link?.split("/").at(-1);

  const contentStep = useMemo(
    () => ({
      [IMPORT_REVIEW_STEP.importForm]: (
        <>
          <VStack>
            <Text fontFamily="lexend" fontSize="xl" color="gray.0">
              Import a Review
            </Text>
            <Text fontSize="md" color="gray.0">
              Found a great tweet about this project? Paste the link here!
            </Text>
          </VStack>
          <FormControl isInvalid={!!errors.link}>
            <FormLabel color="gray.60" fontSize="xs" fontWeight="500">
              Review Link *
            </FormLabel>
            <Input
              placeholder="https://x.com/"
              {...register("link", {
                required: "This field is a required field"
                // pattern: {
                //   value: /^(https:\/\/(www\.)?)?x\.com\/[^\\/]+\/status\/\d+(?:\?.*)?$/,
                //   message:
                //     "That doesn’t look like a valid X URL. Please try again."
                // }
              })}
            />
            {errors.link ? (
              <InputError errorMessage={errors.link.message} />
            ) : (
              <Text color="gray.60" fontSize="xs" fontWeight="500">
                Paste the URL of the tweet related to this project.
              </Text>
            )}
          </FormControl>
          <HStack columnGap="16px" width="full" justifyContent="flex-end">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => {
                setLoading(true);
                axiosClient
                  .get(`${apiKeys.twitter}/${postId}`)
                  .then((res) => {
                    setPost(res.data);
                    setStep(IMPORT_REVIEW_STEP.preview);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              type="submit"
              isDisabled={!!errors.link}
              variant="primary"
            >
              Import
            </Button>
          </HStack>
        </>
      ),
      [IMPORT_REVIEW_STEP.preview]: <Preview setStep={setStep} />,
      [IMPORT_REVIEW_STEP.review]: (
        <VStack rowGap="16px" width="full">
          <VStack alignItems="center">
            <Text
              textAlign="center"
              fontFamily="lexend"
              fontSize="xl"
              color="gray.0"
            >
              Review Preview
            </Text>
            <Text textAlign="center" fontSize="md" color="gray.0">
              Please check your tweet preview and confirm to import.
            </Text>
          </VStack>
          <ImportedReviewBox post={post} setPost={setPost} />
        </VStack>
      )
    }),
    [errors.link, isLoading, postId, post]
  );

  return (
    <VStack
      onSubmit={handleSubmit(() => {})}
      as="form"
      rowGap="16px"
      maxWidth="600px"
    >
      {contentStep[step]}
    </VStack>
  );
};
