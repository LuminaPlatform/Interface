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

const ChakraForm = chakra("form");
export const Login = ({ setStep }: WalletModalBodyProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<ModalForm>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <ChakraForm
      onSubmit={handleSubmit((values) => console.log({ values }))}
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
          setStep(STEP_MODAL.wallet);
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
        type="submit"
        variant="primary"
        isDisabled={!!errors.email || !!errors.password}
      >
        Log in
      </Button>
      <HStack columnGap="4px">
        <Text lineHeight="40px" color="gray.0" fontSize="md">
          New to lumina?
        </Text>
        <Button onClick={() => setStep(STEP_MODAL.register)} variant="ghost">
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
