import { Badges } from "@/types";
import {
  Button,
  Img,
  Text,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { AllBadges } from "./AllBadges";

interface BasicBadgeProps extends UseDisclosureProps {
  badgeType: Badges;
}
export const BasicBadge = ({ badgeType, onClose }: BasicBadgeProps) => {
  const badge = AllBadges[badgeType];
  return (
    <VStack rowGap="0" width="full">
      <Img
        objectFit="cover"
        rounded="full"
        alt="badge"
        width="88px"
        height="88px"
        src={badge.imgSrc || "/assets/images/default-img.png"}
        mb="40px"
        {...(badgeType === Badges.HOLDER && {
          outline: "1px solid",
          outlineOffset: "1px",
          outlineColor: "primary.300"
        })}
      />
      <Text fontFamily="lexend" fontSize="xl" fontWeight="600" color="gray.0">
        {badge.title}
      </Text>
      <Text
        fontSize="lg"
        lineHeight="28.8px"
        color="gray.40"
        mt="8px"
        textAlign="center"
        width="362px"
      >
        {badge.description}
      </Text>
      <Button size="md" mt="24px" variant="primary" onClick={onClose}>
        Explore Lumina
      </Button>
    </VStack>
  );
};
