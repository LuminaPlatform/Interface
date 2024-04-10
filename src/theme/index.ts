import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: {
      baseStyle: {
        fontFamily: "satoshi",
        boxShadow: "none !important",
        height: "40px",
        paddingInline: "16px",
      },
      variants: {
        primary: {
          fontSize: "md",
          fontWeight: "700",
          color: "gray.0",
          bg: "primary.300",
          _hover: {
            bg: "primary.400",
            color: "gray.10",
          },
          _active: {
            bg: "primary.500",
            color: "gray.20",
          },
        },
      },
    },
  },

  styles: {
    global: {
      "html, body": {
        fontFamily: "Lexend",
        scrollBehavior: "smooth",
        backgroundColor: "gray.900",
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "*::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "*::-webkit-scrollbar-thumb": {
          borderRadius: "14px",
          background: "rgba(217,217,217,0.3)",
          "&:hover": {
            background: "rgba(217,217,217,0.5)",
          },
        },
      },
      body: {
        bg: "transparent",
        color: "none",
      },
    },
  },
});
