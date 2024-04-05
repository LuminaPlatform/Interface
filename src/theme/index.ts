import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: {
      baseStyle: {
        boxShadow: "none !important",
        height: "40px",
        paddingInline: "16px",
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
