// TODO should fix this lints

/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  FormLabelProps,
  HStack,
  Img,
  Input,
  Text,
  Tooltip,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { TbInfoCircleFilled, TbPhotoPlus } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";
import { fileLimitation } from "@/config/fileLimitation";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { useRouter } from "next/router";
import { ReviewStatus } from "@/types";
import { useCustomToast } from "@/hooks/bases";
import { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { useState } from "react";
import { ReviewForm as ReviewFormType } from "../types";
import {
  useProjectData,
  useProjectDataDispatch,
  useProjectReviewsDispatch
} from "../hooks";

const labelProps: FormLabelProps = {
  color: "gray.60",
  fontSize: "xs",
  fontWeight: "500"
};
const descriptionThreshold = 2048;
const ChakraForm = chakra("form");

interface ReviewFormProps {
  onClose: UseDisclosureProps["onClose"];
  status: ReviewStatus["name"];
}
export const ReviewForm = ({ onClose, status }: ReviewFormProps) => {
  const [isLoading, setLoading] = useState(false);
  const { query } = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset
  } = useForm<ReviewFormType>({
    defaultValues: {
      description: "",
      medias: []
    },
    mode: "all"
  });
  const toast = useCustomToast();
  const dispatchProject = useProjectDataDispatch();
  const project = useProjectData();
  const projectReviewDispatch = useProjectReviewsDispatch();
  const onSubmit = (data: ReviewFormType) => {
    setLoading(true);
    const modelData = {
      0: {
        model_name: "Review",
        params: {
          title: data.title,
          description: data.description,
          project_id: +query.projectId,
          viewpoint: status
        }
      }
    };
    axiosClient
      .post(apiKeys.create, modelData, {
        headers: {
          Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
        }
      })
      .then(async (response) => {
        if (response.status === 201) {
          reset();
          onClose();
          await axiosClient
            .get(`${apiKeys.viewpoint}/${+query.projectId}`)
            .then((response) => {
              dispatchProject({
                ...project,
                viewpoints: response.data.viewpoints
              });
              return response;
            })
            .then(() => {
              const formData = new FormData();
              medias.forEach((media) => formData.append("file", media));
              formData.append(
                "proposal",
                JSON.stringify({
                  model: "Review",
                  id: response.data[0].id,
                  field: "files"
                })
              );
              if (medias.length !== 0) {
                return axiosClient
                  .post(apiKeys.file.file, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                  })
                  .then(() => {
                    return axiosClient.post(apiKeys.fetch, {
                      0: {
                        model: "Project.reviews",
                        model_id: +query.projectId,
                        orders: [],
                        graph: {
                          fetch_fields: [
                            {
                              name: "*"
                            },
                            {
                              name: "user",
                              graph: {
                                fetch_fields: [
                                  {
                                    name: "display_name"
                                  },
                                  {
                                    name: "id"
                                  },
                                  {
                                    name: "profile_id"
                                  }
                                ]
                              }
                            },
                            {
                              name: "files",
                              graph: {
                                fetch_fields: [
                                  {
                                    name: "*"
                                  }
                                ]
                              }
                            }
                          ]
                        },
                        condition: {}
                      }
                    });
                  });
              }
            })
            .then((resp) => {
              if (medias.length === 0) {
                return axiosClient.post(apiKeys.fetch, {
                  0: {
                    model: "Project.reviews",
                    model_id: +query.projectId,
                    orders: [],
                    graph: {
                      fetch_fields: [
                        {
                          name: "*"
                        },
                        {
                          name: "user",
                          graph: {
                            fetch_fields: [
                              {
                                name: "display_name"
                              },
                              {
                                name: "id"
                              },
                              {
                                name: "profile_id"
                              }
                            ]
                          }
                        },
                        {
                          name: "files",
                          graph: {
                            fetch_fields: [
                              {
                                name: "*"
                              }
                            ]
                          }
                        }
                      ]
                    },
                    condition: {}
                  }
                });
              }
              return resp;
            })
            .then((res) => {
              projectReviewDispatch(res.data[0]);
              return res;
            });
        }
      })
      .then(() => {
        return toast({
          description: "Your review is submitted.",
          status: "success"
        });
      })
      .catch((err: AxiosError<{ error_message: string }>) => {
        toast({
          description: err.response.data.error_message,
          status: "error"
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { description, medias } = useWatch<ReviewFormType>({ control });

  return (
    <ChakraForm
      display="flex"
      flexDirection="column"
      rowGap="16px"
      onSubmit={handleSubmit(onSubmit)}
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
              message: "Enter a title for your review"
            }
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
              message: "Enter a description for your review"
            },
            maxLength: {
              value: descriptionThreshold,
              message: `Max length exceeded (${descriptionThreshold})`
            }
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
                required: false
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
                  cursor: "pointer"
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
        <Button
          isDisabled={isLoading}
          onClick={onClose}
          type="button"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </HStack>
    </ChakraForm>
  );
};
