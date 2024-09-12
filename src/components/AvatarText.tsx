import {
  Box,
  HStack,
  ImageProps,
  Img,
  Text,
  TextProps
} from "@chakra-ui/react";

type AvatarTextProps = {
  imageStyle: ImageProps;
  src: string;
  hasBadge: boolean;
  textStyle: TextProps;
  name: string;
  badgeSize: ImageProps["width"];
};
type AvatarProps = Pick<
  AvatarTextProps,
  "hasBadge" | "imageStyle" | "src" | "badgeSize"
>;
export const Avatar = ({
  hasBadge,
  src,
  imageStyle,
  badgeSize
}: AvatarProps) => {
  return (
    <Box
      rounded="full"
      minWidth={imageStyle.width}
      minHeight={imageStyle.height}
      {...(hasBadge && {
        outline: "1px solid red",
        outlineOffset: "1px",
        position: "relative"
      })}
    >
      <Img
        rounded="full"
        alt="profile"
        objectFit="cover"
        src={src}
        {...imageStyle}
      />
      {hasBadge && (
        <Img
          objectFit="cover"
          src="/assets/images/profile/badge.png"
          position="absolute"
          bottom="0"
          left="0"
          width={badgeSize}
          height={badgeSize}
        />
      )}
    </Box>
  );
};
export const AvatarText = ({
  imageStyle,
  textStyle,
  hasBadge,
  name,
  badgeSize,
  src
}: AvatarTextProps) => {
  return (
    <HStack>
      <Avatar
        badgeSize={badgeSize}
        src={src}
        hasBadge={hasBadge}
        imageStyle={imageStyle}
      />
      <Text {...textStyle}> {name}</Text>
    </HStack>
  );
};
