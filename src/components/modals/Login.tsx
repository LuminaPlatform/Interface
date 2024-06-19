import { ModalForm, STEP_MODAL, WalletModalBodyProps } from "@/types";
import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  TbArrowNarrowLeft,
  TbBrandGoogleFilled,
  TbEye,
  TbEyeOff,
  TbMail,
} from "react-icons/tb";
import { MethodSeparator } from "../MethodSeparator";
import { FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEmailLogin } from "@/hooks/auth";
import {
  useCustomToast,
  useDispatchAuthorization,
  useDispatchModalSteps,
  useWalletModal,
} from "@/hooks/bases";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { setCookie } from "cookies-next";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";

const ChakraForm = chakra("form");
export const Login = ({}: WalletModalBodyProps) => {
  const { mutate } = useEmailLogin();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<ModalForm>();
  const toast = useCustomToast();

  const [showPassword, setShowPassword] = useState(false);

  const { onClose } = useWalletModal();
  const dispatchAuthorization = useDispatchAuthorization();
  const dispatchSteps = useDispatchModalSteps();

  const handleGoogleLogin = async () => {
    axiosClient
      .get(apiKeys["auth"]["login"]["google"]["req"])
      .then((response) => {
        const openedWindow = window.open(
          response.data.url,
          "_blank",
          "width=500,height=600"
        );
        const pollTimer = window.setInterval(function () {
          try {
            if (openedWindow.location.href.includes("https://lumina.credit/")) {
              window.clearInterval(pollTimer);
              openedWindow.close();

              const urlParams = new URLSearchParams(
                openedWindow.location.search
              );
              const authorizationCode = urlParams.get("code");


              window.location.href = "/welcome";
            }
          } catch (e) {
            console.log("Error:", e);
          }
        }, 1000);
      });
  };

  return (
    <ChakraForm
      display="flex"
      flexDirection="column"
      width="full"
      rowGap="16px"
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Icon
        cursor="pointer"
        as={TbArrowNarrowLeft}
        color="gray.0"
        fontSize="24px"
        top="16px"
        position="absolute"
        left="16px"
        onClick={() => {
          dispatchSteps(STEP_MODAL.wallet);
        }}
      />
      <Text textAlign="center" color="gray.0" fontSize="xl" fontWeight="600">
        Login by Email
      </Text>
      <VStack py="16px" width="full" rowGap="16px">
        <FormControl>
          <FormLabel
            fontSize="xs"
            fontWeight="500"
            color="gray.60"
            htmlFor="email"
          >
            Email*
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <TbMail color="var(--chakra-colors-gray-100)" />
            </InputLeftElement>
            <Input
              type="email"
              isInvalid={!!errors.email}
              placeholder="Example@gmail.com"
              variant="outline"
              id="email"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid Email",
                },
              })}
            />
          </InputGroup>
          {!!errors.email && (
            <Text fontSize="xs" fontWeight="500" pt="2px" color="red.200">
              {errors.email.message}
            </Text>
          )}
        </FormControl>
        <FormControl>
          <FormLabel
            fontSize="xs"
            fontWeight="500"
            color="gray.60"
            htmlFor="password"
          >
            Password*
          </FormLabel>
          <InputGroup>
            <InputRightElement onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (
                <TbEye color="var(--chakra-colors-gray-100)" />
              ) : (
                <TbEyeOff color="var(--chakra-colors-gray-100)" />
              )}
            </InputRightElement>
            <Input
              isInvalid={!!errors.password}
              placeholder="********"
              variant="outline"
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
            />
          </InputGroup>
          {!!errors.password && (
            <Text fontSize="xs" fontWeight="500" pt="2px" color="red.200">
              {errors.password.message}
            </Text>
          )}
        </FormControl>
      </VStack>
      <Button
        type="button"
        variant="primary"
        isDisabled={!!errors.email || !!errors.password}
        onClick={handleSubmit(({ email, password }) => {
          mutate(
            { username: email, password },
            {
              onSuccess: ({ data: { access_token } }) => {
                setCookie(ACCESS_TOKEN_COOKIE_KEY, access_token);
                dispatchSteps(STEP_MODAL.wallet);
                return axiosClient
                  .get(apiKeys.auth.isAuthorized, {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                  })
                  .then((userDataResponse) => userDataResponse.data)
                  .then((user) => {
                    dispatchAuthorization(user);
                    dispatchSteps(STEP_MODAL.verified);
                    onClose();
                    return toast({
                      description: "You are logged in",
                      status: "success",
                    });
                  });
              },
              onError: (error) => {
                return toast({
                  title: error.response.data.error_message,
                  description: error.response.data.error_detail,
                  status: "error",
                });
              },
            }
          );
        })}
      >
        Log in
      </Button>
      <HStack columnGap="4px">
        <Text lineHeight="40px" color="gray.0" fontSize="md">
          New to lumina?
        </Text>
        <Button
          onClick={() => dispatchSteps(STEP_MODAL.register)}
          variant="ghost"
        >
          Register Now
        </Button>
      </HStack>
      <MethodSeparator />
      <HStack columnGap="16px" width="full">
        <Button
          bg="none"
          border="1px solid"
          borderColor="primary.50"
          _active={{
            bg: "none",
            borderColor: "primary.50",
          }}
          _hover={{
            bg: "none",
            borderColor: "primary.50",
          }}
          height="48px"
          borderRadius="33px"
          width="full"
        >
          <FaApple color="var(--chakra-colors-primary-50)" fontSize="32px" />
        </Button>
        <Button
          bg="none"
          border="1px solid"
          borderColor="primary.50"
          _active={{
            bg: "none",
            borderColor: "primary.50",
          }}
          _hover={{
            bg: "none",
            borderColor: "primary.50",
          }}
          height="48px"
          borderRadius="33px"
          width="full"
          onClick={handleGoogleLogin}
        >
          <TbBrandGoogleFilled
            color="var(--chakra-colors-primary-50)"
            fontSize="32px"
          />
        </Button>
      </HStack>
    </ChakraForm>
  );
};
