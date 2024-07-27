import { Button, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";

function Error({ statusCode }) {
  console.log(
    statusCode
      ? `An error ${statusCode} occurred on server`
      : "An error occurred on client"
  );
  const router = useRouter();

  return (
    <VStack
      width="full"
      position="relative"
      minH="100vh"
      justifyContent="center"
    >
      <VStack rowGap="24px" position="relative" zIndex={1}>
        <Img src="/assets/images/500/500.png" />
        <Text
          color="gray.0"
          fontSize="3xl"
          fontWeight="600"
          fontFamily="lexend"
        >
          Internal Server Error
        </Text>
        <Text
          textAlign="center"
          maxW={{ base: "300px", md: "485px" }}
          fontSize="lg"
          color="gray.0"
          fontWeight="500"
        >
          Oh no! Something went unexpectedly wrong on our end. Rest assured,
          we're fixing it ASAP.
        </Text>
        <HStack columnGap="24px">
          <Button onClick={() => router.reload()} variant="outline">
            Try Again
          </Button>
          <Button onClick={() => router.replace("/")} variant="primary">
            Back to Home
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
Error.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
export default Error;
