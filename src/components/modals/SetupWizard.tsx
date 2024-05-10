import { SetupWizardForm, WalletModalBodyProps } from "@/types";
import {
  Box,
  Button,
  Stepper as ChakraStepper,
  GridItem,
  HStack,
  Img,
  Link,
  SimpleGrid,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { ActionCard } from "../ActionCard";
import { TbBrandXFilled, TbChevronLeft, TbChevronsLeft } from "react-icons/tb";
import { useWalletModal } from "@/hooks/bases";
import { axiosClient } from "@/config/axios";
import { ConnectSocial } from "../wizardSteps/ConnectSocial";
import { Profile } from "../wizardSteps/Profile";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Interests } from "../wizardSteps/Interests";

const Stepper = ({ activeStep, setActiveStep }) => {
  const {
    formState: { errors },
  } = useFormContext<SetupWizardForm>();

  const [isConnect, setConnect] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { onClose } = useWalletModal();

  const handleSubmit = {
    0: () => {
      console.log("0");
      setActiveStep((prev) => prev + 1);
    },
    1: () => {
      console.log("1");
      setActiveStep((prev) => prev + 1);
    },
    2: () => {
      console.log("2");
    },
  };

  const stepsComponent = useMemo(() => {
    return {
      0: <ConnectSocial setConnect={setConnect} isConnect={isConnect} />,
      1: <Profile editMode={editMode} setEditMode={setEditMode} />,
      2: <Interests />,
    };
  }, [editMode, isConnect]);
  console.log(steps.length);

  return (
    <Stack mt="4px" rowGap="16px" width="full">
      <ChakraStepper size="sm" index={activeStep} gap="0">
        {steps.map((step, index) => (
          <Step style={{ columnGap: 0 }} key={index}>
            <VStack justifyContent="flex-start">
              <StepIndicator
                bg="gray.80"
                width="24px"
                height="24px"
                border="none"
                sx={{
                  "[data-status=active] &": {
                    outline: "1px dashed",
                    outlineColor: "primary.300",
                    outlineOffset: "2px",
                    bg: "primary.300",
                  },
                  "[data-status=complete] &": {
                    bg: "primary.300",
                  },
                }}
              >
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<Text color="gray.10">{index + 1}</Text>}
                  active={<Text color="gray.10">{index + 1}</Text>}
                />
              </StepIndicator>
              <Box flexShrink="0">
                <StepTitle
                  // @ts-expect-error
                  fontSize="lg"
                  fontWeight={index === activeStep ? "700" : "400"}
                  color={index === activeStep ? "primary.50" : "gray.60"}
                >
                  {step.title}
                </StepTitle>
              </Box>
            </VStack>
            <StepSeparator
              // @ts-expect-error
              _horizontal={{
                alignSelf: "flex-start",
                borderRadius: "50%",
                mt: "12px",
                backgroundColor: "gray.60",
                "[data-status=complete] &": {
                  bg: "primary.300",
                },
              }}
              style={{
                marginInline: "4px",
                height: "2px",
              }}
            />
          </Step>
        ))}
      </ChakraStepper>
      {stepsComponent[activeStep]}
      <HStack width="full" justifyContent="space-between">
        {activeStep !== 0 && (
          <Button
            onClick={() => {
              setActiveStep((prev) => prev - 1);
            }}
            color="gray.60"
            fontSize="md"
            fontWeight="700"
            _hover={{}}
            _active={{}}
            bg="transparent"
            leftIcon={<TbChevronsLeft />}
          >
            Back
          </Button>
        )}
        <HStack width="full" justifyContent="flex-end">
          <Button
            onClick={() => {
              if (activeStep === steps.length - 1) {
                onClose();
              } else {
                setActiveStep((prev) => prev + 1);
              }
            }}
            color="gray.60"
            fontSize="md"
            fontWeight="700"
            _hover={{}}
            _active={{}}
            bg="transparent"
          >
            Skip This Step
          </Button>
          <Button
            onClick={handleSubmit[activeStep]}
            size="md"
            isDisabled={
              (activeStep === steps.length - 1 && !!errors.interests) ||
              (activeStep === 1 && (!!errors.nickname || !!errors.username))
            }
            variant="primary"
          >
            Submit
          </Button>
        </HStack>
      </HStack>
    </Stack>
  );
};

const steps = [
  { title: "Social" },
  { title: "Profile" },
  { title: "Interests" },
];

interface SetupWizardProps extends WalletModalBodyProps {}

export const SetupWizard = ({ setStep }: SetupWizardProps) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const activeStepText = steps[activeStep].title;
  const methods = useForm<SetupWizardForm>({
    defaultValues: {
      profile: null,
      interests: [],
    },
  });

  return (
    <VStack
      as={motion.div}
      exit={{
        opacity: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      display="flex"
      flexDirection="column"
      width="full"
      rowGap="16px"
      px="14px"
      position="relative"
      overflow="hidden"
    >
      <Box
        zIndex={-1}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        left="20%"
        boxShadow={`0 0 ${100}px ${100}px rgba(255,136,0,0.5)`}
        rounded="full"
        opacity="0.3"
        width="50px"
        height="50px"
        backgroundColor="rgba(255,136,0,0.5)"
      />
      <FormProvider {...methods}>
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
      </FormProvider>
    </VStack>
  );
};