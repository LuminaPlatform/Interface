import { border, extendTheme } from "@chakra-ui/react";
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
        borderRadius: "8px",
        fontWeight: "700",
        fontSize: "md",
      },
      variants: {
        primary: {
          fontSize: "md",
          fontWeight: "700",
          color: "gray.0",
          bg: "primary.300",
          _hover: {
            bg: "primary.200",
            color: "gray.0",
          },
          _active: {
            bg: "primary.300",
            color: "gray.0",
          },
          _disabled: {
            bg: "gray.80",
            opacity: 1,
            _hover: {
              bg: "gray.80 !important",
              opacity: 0.8,
            },
            _active: {
              bg: "gray.80 !important",
              opacity: 0.8,
            },
          },
        },
        ghost: {
          color: "primary.200",
          px: "0",
          margin: "0",
          _hover: {
            textDecoration: "underline",
            color: "primary.200",
            bg: "none",
          },
          _active: {
            textDecoration: "underline",
            color: "primary.200",
            bg: "none",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            fontFamily: "satoshi",
            fontSize: "md",
            border: "0.5px solid",
            borderRadius: "12px",
            color: "gray.100",
            borderColor: "gray.100",
            _hover: {
              color: "gray.100",
              backgroundColor: "gray.700",
              border: "none",
              boxShadow: "none",
            },
            _focus: {
              color: "gray.40",
              borderColor: "gray.100",
              boxShadow: "none",
            },
            _invalid: {
              color: "gray.40",
              borderColor: "red.200",
              background: "gray.700",
              boxShadow: "none !important",
            },
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
