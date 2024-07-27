import { Box, Button, Img, ImgProps, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";

interface LighthouseComponentProps extends ImgProps {}
const LighthouseComponent = ({ ...rest }: LighthouseComponentProps) => (
  <Img
    zIndex={0}
    top="50%"
    left="0"
    transform="translateY(-50%)"
    src="/assets/images/404/lighthouse.png"
    position="absolute"
    {...rest}
  />
);
const NotFound = () => {
  const router = useRouter();
  return (
    <VStack
      width="full"
      position="relative"
      minH="100vh"
      justifyContent="center"
    >
      <LighthouseComponent />
      <VStack rowGap="24px" position="relative" zIndex={1}>
        <Img src="/assets/images/404/404.png" />
        <Text
          color="gray.0"
          fontSize="3xl"
          fontWeight="600"
          fontFamily="lexend"
        >
          Page Not Found
        </Text>
        <Text
          textAlign="center"
          maxW={{ base: "300px", md: "485px" }}
          fontSize="lg"
          color="gray.0"
          fontWeight="500"
        >
          Whoops! We've searched high and low but can't find the page you're
          looking for.
        </Text>
        <Button onClick={() => router.replace("/")} variant="primary">
          Back to Home
        </Button>
      </VStack>
      <LighthouseComponent
        transform="rotateY(180deg)"
        left="unset"
        bottom="0"
        right="0"
      />
    </VStack>
  );
};
NotFound.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default NotFound;
