import { border, extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const theme = extendTheme({
  colors: colors,
  components: {
    Button: {
      sizes: {
        sm: {
          height: "32px",
          borderRadius: "6px",
          fontSize: "xs",
          fontWeight: "700",
        },
        md: {
          height: "40px",
          borderRadius: "8px",
          fontSize: "md",
          fontWeight: "700",
        },
      },
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
        outline: {
          border: "1px solid",
          borderColor: "primary.50",
          color: "primary.50",
          background: "transparent",
          _hover: {
            borderColor: "primary.300",
            color: "primary.300",
            background: "transparent",
          },
          _active: {
            borderColor: "primary.300",
            color: "primary.300",
            background: "transparent",
          },
          _disabled: {
            borderColor: "primary.100",
            color: "primary.100",
            background: "transparent",
          },
        },
        primaryDark: {
          border: "none",
          color: "gray.20",
          background: "gray.700",
          _hover: {
            color: "gray.20",
            background: "#00000040",
            boxShadow: "1px 4px 16px 0px #00000040",
          },
          _active: {
            color: "gray.20",
            background: "#00000040",
            boxShadow: "1px 4px 16px 0px #00000040",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderRadius: "6px",
        },
      },
      sizes: {
        md: {
          control: {
            width: "20px",
            height: "20px",
          },
        },
      },
      variants: {
        primary: {
          control: {
            borderColor: "gray.60",
            _hover: {
              border: "1px solid",
              borderColor: "gray.100 !important",
              bg: "transparent !important",
            },
            _checked: {
              bg: "primary.300",
              border: "none",
              _hover: {
                bg: "primary.400 !important",
                border: "none !important",
              },
            },
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
            _placeholder: {
              fontSize: "md",
              color: "gray.100",
            },
          },
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          fontWeight: 700,
        },
      },
      sizes: {
        md: {
          container: {
            height: "32px",
            borderRadius: "17px",
            px: "8px",
            fontSize: "md",
          },
        },
        sm: {
          container: {
            height: "24px",
            borderRadius: "12px",
            px: "8px",
            fontSize: "xs",
          },
        },
      },
      variants: {
        lightOrange: {
          container: {
            bg: "gray.40",
            color: "primary.400",
          },
        },
        darkOrange: {
          container: {
            bg: "gray.600",
            color: "primary.300",
          },
        },
        green: {
          container: {
            bg: "green.75",
            color: "green.400",
          },
        },
        dark: {
          container: {
            bg: "gray.900",
            color: "gray.80",
            border: "1px solid",
            borderColor: "gray.80",
          },
        },
      },
    },
    FormLabel: {
      sizes: {
        sm: {
          fontSize: "xs",
          fontWeight: 500,
        },
      },
      variants: {
        primary: {
          color: "gray.40",
        },
      },
    },
    Modal: {
      sizes: {
        "3xl": {
          body: { width: "782px" },
        },
      },
    },
  },

  styles: {
    global: {
      "html, body": {
        fontFamily: "satoshi",
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
