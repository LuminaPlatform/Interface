import { STEP_MODAL } from "@/types";
import {
  Button,
  chakra,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
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

interface ModalBodyProps {
  setStep: Dispatch<SetStateAction<STEP_MODAL>>;
}

interface registerFromType {
  email: string;
  password: string;
  isAccepted: boolean;
}

const ChakraForm = chakra("form");

export const Register = ({ setStep }: ModalBodyProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<registerFromType>({ mode: "all", reValidateMode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  console.log({ errors });

  return (
    <ChakraForm
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit((values) => console.log({ values }))}
      display="flex"
      flexDirection="column"
      width="full"
      rowGap="16px"
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
        Register by Email
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
        <FormControl
          sx={{
            "label>span:first-of-type": {
              width: "20px",
              height: "20px",
              border: "1px solid",
              borderColor: "gray.60",
              borderRadius: "6px",
            },
            "label>span:first-of-type[data-checked]": {
              border: "none",
              backgroundColor: "primary.300",
            },
          }}
        >
          <Checkbox
            color="gray.0"
            {...register("isAccepted", {
              required: "Read terms & conditions",
            })}
          >
            I agree with Lumina&apos;s{" "}
            <Button variant="ghost">Terms of service </Button>
          </Checkbox>
          {!!errors.isAccepted && (
            <Text fontSize="xs" fontWeight="500" pt="2px" color="red.200">
              {errors.isAccepted.message}
            </Text>
          )}
        </FormControl>
      </VStack>
      <Button
        type="submit"
        variant="primary"
        isDisabled={!!errors.email || !!errors.password || !!errors.isAccepted}
      >
        Register
      </Button>
      <HStack columnGap="4px">
        <Text lineHeight="40px" color="gray.0" fontSize="md">
          Already have an account?
        </Text>
        <Button onClick={() => setStep(STEP_MODAL.login)} variant="ghost">
          Login
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