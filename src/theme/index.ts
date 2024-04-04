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
        backgroundColor:'gray.900'
      },
      body: {
        bg: "transparent",
        color: "none",
      },
    },
  },
});
