import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  FormLabelProps,
  HStack,
  Icon,
  Img,
  Input,
  ModalCloseButton,
  Text,
  Tooltip,
  UseDisclosureProps,
  VStack,
} from "@chakra-ui/react";
import { ReviewForm as ReviewFormType } from "../types";
import { TbInfoCircleFilled, TbPhotoPlus } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { fileLimitation } from "@/config/fileLimitation";

const labelProps: FormLabelProps = {
  color: "gray.60",
  fontSize: "xs",
  fontWeight: "500",
};
const descriptionThreshold = 2048;
const ChakraForm = chakra("form");

interface ReviewFormProps {
  onClose: UseDisclosureProps["onClose"];
}
export const ReviewForm = ({ onClose }: ReviewFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<ReviewFormType>({
    defaultValues: {
      description: "",
      medias: [],
    },
    mode: "all",
  });
  const { description, medias } = useWatch<ReviewFormType>({ control });
  console.log({ errors });

  return (
    <ChakraForm
      display="flex"
      flexDirection="column"
      rowGap="16px"
      onSubmit={handleSubmit((values) => {
        console.log({ values, errors });
        console.log(!!errors.title);
      })}
      width="full"
    >
      <FormControl isInvalid={!!errors.title}>
        <FormLabel {...labelProps}>Title *</FormLabel>
        <Input
          variant="outline"
          placeholder="title"
          {...register("title", {
            required: {
              value: true,
              message: "Enter a title for your review",
            },
          })}
        />
        {!!errors.title && (
          <Text fontSize="xs" color="red.200">
            {errors.title.message}
          </Text>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.description}>
        <FormLabel {...labelProps}>Describe your experience *</FormLabel>
        <Controller
          control={control}
          name="description"
          rules={{
            required: {
              value: true,
              message: "Enter a description for your review",
            },
            maxLength: {
              value: descriptionThreshold,
              message: `Max length exceeded (${descriptionThreshold})`,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              minH="150px"
              placeholder="write here...."
              as="textarea"
              onBlur={onBlur}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <HStack
          width="full"
          justifyContent={
            (!!errors.description && errors.description.type) === "maxLength"
              ? "space-between"
              : "flex-end"
          }
        >
          {!!errors.description && (
            <Text fontSize="xs" color="red.200">
              {errors.description.message}
            </Text>
          )}
          <Text
            color={
              (!!errors.description && errors.description.type) === "maxLength"
                ? "red.200"
                : "gray.80"
            }
            fontSize="xs"
            fontWeight="500"
          >
            {description.length}/{descriptionThreshold}
          </Text>
        </HStack>
      </FormControl>
      <VStack width="full">
        <HStack width="full">
          <Text color="gray.40" fontSize="md" fontWeight="700">
            Media Upload
          </Text>
          <Tooltip
            bg="gray.700"
            borderRadius="6px"
            placement="top"
            label={
              <>
                <Text fontSize="xs" color="gray.40">
                  Upload up to 3 images.
                </Text>
                <Text fontSize="xs" color="gray.40">
                  Maximum file size: 3 MB
                </Text>
              </>
            }
            fontSize="md"
          >
            <span>
              <TbInfoCircleFilled color="var(--chakra-colors-gray-40)" />
            </span>
          </Tooltip>
        </HStack>
        <HStack alignItems="flex-start" width="full">
          <FormControl>
            <VStack
              htmlFor="media"
              as={FormLabel}
              border="1px dashed"
              borderColor="gray.200"
              borderRadius="8px"
              width="124px"
              height="70px"
              justifyContent="center"
            >
              <TbPhotoPlus color="var(--chakra-colors-gray-200)" />
              <Text color="gray.200" fontSize="xs" fontWeight="700">
                Upload images
              </Text>
            </VStack>
            <Input
              w="0"
              h="0"
              id="media"
              type="file"
              visibility="hidden"
              {...register("medias", {
                validate: fileLimitation,
              })}
              onChange={(e) => {
                if (
                  medias.length < 3 &&
                  !!medias.every(
                    (item) =>
                      item.type + item.name + item.size !==
                      e.target.files[0].type +
                        e.target.files[0].name +
                        e.target.files[0].size
                  )
                ) {
                  setValue("medias", [...medias, e.target.files[0]]);
                }
              }}
            />
            {!!errors.medias && (
              <Text fontSize="xs" color="red.200">
                {errors.medias.message}
              </Text>
            )}
          </FormControl>
          {medias.map((media) => (
            <Box position="relative" key={media.type + media.name + media.size}>
              <IoMdCloseCircle
                fontSize="20px"
                style={{
                  top: "-8px",
                  left: "-8px",
                  position: "absolute",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const filteredMedias = medias.filter(
                    (item) =>
                      item.type + item.name + item.size !==
                      media.type + media.name + media.size
                  );
                  setValue("medias", filteredMedias);
                }}
                color="var(--chakra-colors-red-200)"
              />
              <Img
                margin={0}
                borderRadius="8px"
                minW="124px"
                minH="70px"
                w="124px"
                h="70px"
                objectFit="cover"
                src={URL.createObjectURL(media)}
              />
            </Box>
          ))}
        </HStack>
      </VStack>
      <HStack width="full" justifyContent="flex-end">
        <Button onClick={onClose} type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </HStack>
    </ChakraForm>
  );
};
