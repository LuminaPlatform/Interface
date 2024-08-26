import { ModalForm, OTPProps } from "@/types";
import {
  Button,
  chakra,
  HStack,
  Icon,
  PinInput,
  PinInputField,
  Text,
  VStack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { TbArrowNarrowLeft } from "react-icons/tb";

const OTPFields = Array(6)
  .fill("")
  .map((_, index) => index);

const ChakraForm = chakra("form");

const otpDuration = 10;

export const OTP = ({ handleClick, backIconHandler }: OTPProps) => {
  const { getValues } = useFormContext<ModalForm>();
  const email = getValues("email");

  const { register, control, handleSubmit } = useForm<{ otp: string[] }>({
    defaultValues: {
      otp: ["", "", "", "", "", ""]
    }
  });
  const otpValues = useWatch({ control });

  const [isExpired, setExpired] = useState(false);

  const [minutes, setMinutes] = useState(otpDuration);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds === 0 && minutes === 0) {
      setExpired(true);
    }
    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes !== 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      padding="0"
      margin="0"
      alignItems="center"
    >
      {backIconHandler && (
        <Icon
          cursor="pointer"
          as={TbArrowNarrowLeft}
          color="gray.0"
          fontSize="24px"
          top="16px"
          position="absolute"
          left="16px"
          onClick={() => {
            backIconHandler();
          }}
        />
      )}
      <VStack width="full" maxWidth="371px">
        <Text color="gray.0" fontSize="xl" fontWeight="600">
          Verify Your Email
        </Text>
        <Text
          color="gray.0"
          fontSize="sm"
          fontWeight="400"
          lineHeight="21.6px"
          as="span"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          Enter the code sent to your email address
          <span>
            <Text
              fontWeight="bold"
              as="span"
              fontSize="md"
              display="inline-block"
            >
              {email}
            </Text>{" "}
            to verify your account
          </span>
        </Text>
        <ChakraForm mt="32px" width="full">
          <HStack columnGap="10px" justifyContent="center" width="full">
            <PinInput
              isInvalid={!!otpValues.otp?.some((item) => item === "")}
              placeholder="-"
              otp
            >
              {OTPFields.map((item) => (
                <PinInputField
                  _invalid={{
                    borderColor: "red.200"
                  }}
                  borderRadius={{ base: "8px", md: "12px" }}
                  width={{ base: "35px", md: "48px" }}
                  height={{ base: "35px", md: "48px" }}
                  bg="gray.600"
                  color="gray.40"
                  fontSize="md"
                  fontWeight="500"
                  borderColor="gray.100"
                  _placeholder={{
                    color: "gray.100"
                  }}
                  _hover={{
                    bg: "gray.700",
                    border: "none"
                  }}
                  _focus={{
                    bg: "gray.700",
                    borer: "1px solid",
                    color: "gray.40",
                    borderColor: "gray.100"
                  }}
                  key={item}
                  defaultValue=""
                  {...register(`otp.${item}`, {
                    required: "Invalid verification code"
                  })}
                />
              ))}
            </PinInput>
          </HStack>
        </ChakraForm>
        <Button
          size="md"
          marginTop="48px"
          width="full"
          isDisabled={!!otpValues.otp?.some((item) => item === "")}
          variant="primary"
          onClick={handleSubmit((values) => handleClick(values))}
        >
          Verify
        </Button>
        {isExpired ? (
          <Button
            onClick={() => {
              setExpired(false);
              setMinutes(otpDuration);
              setSeconds(0);
            }}
            variant="ghost"
          >
            Resend code
          </Button>
        ) : (
          <Text mt="20px" color="gray.0" fontSize="md">
            {minutes}:{seconds}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};
