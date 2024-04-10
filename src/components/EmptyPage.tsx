import { Img, Text, VStack } from "@chakra-ui/react";

type EmptyPageProps = Record<"imgSrc" | "header" | "description", string>;

const EmptyPage = ({ description, header, imgSrc }: EmptyPageProps) => {
  return (
    <VStack width="full" fontFamily="satoshi">
      <Img src={imgSrc} alt="empty state" />
      <Text
        width="full"
        textAlign="center"
        mt="40px"
        fontSize="28px"
        fontWeight="600"
        color="gray.50"
      >
        {header}
      </Text>
      <Text
        width="full"
        textAlign="center"
        fontSize="lg"
        lineHeight="28.8px"
        color="gray.50"
      >
        {description}
      </Text>
    </VStack>
  );
};

export default EmptyPage;
