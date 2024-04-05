import { sidebarWidth } from "@/constant";
import { useDispatchIsOpenSidebar, useIsOpenSidebar } from "@/hooks/bases";
import {
  Box,
  Button,
  Center,
  chakra,
  Divider,
  HStack,
  Icon,
  Img,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Distribute, Project, Reviews, Setting } from "./Icons";

const ChakraLink = chakra(Link, {
  baseStyle: {
    py: "16px",
    width: "full",
    display: "inline-block",
    fontSize: "md",
    fontWeight: "bold",
    color: "gray.10",
    position: "relative",
    pl: "24px",
  },
});

export const Sidebar = () => {
  const routes = [
    {
      id: 0,
      href: "/projects",
      title: "Projects",
      icon: (isActive: boolean) => (
        <Box
          {...(isActive && {
            __css: {
              "&>svg>path": {
                stroke: "primary.300 !important",
              },
            },
          })}
        >
          <Icon as={Project} />
        </Box>
      ),
    },
    {
      id: 1,
      href: "#",
      title: "Reviews",
      icon: (isActive: boolean) => (
        <Box
          {...(isActive && {
            __css: {
              "&>svg>path": {
                stroke: "primary.300 !important",
              },
            },
          })}
        >
          <Icon as={Reviews} />
        </Box>
      ),
    },
    {
      id: 2,
      href: "#",
      title: "Distribute",
      icon: (isActive: boolean) => (
        <Box
          {...(isActive && {
            __css: {
              "&>svg>path": {
                stroke: "primary.300 !important",
              },
            },
          })}
        >
          <Icon as={Distribute} />
        </Box>
      ),
    },
  ];
  const router = useRouter();
  const sidebarDispatcher = useDispatchIsOpenSidebar();
  const isOpen = useIsOpenSidebar();

  const logoImg = useMemo(
    () =>
      !isOpen ? "/assets/images/mini-logo.png" : "/assets/images/logo.png",
    [isOpen]
  );

  return (
    <VStack
      bg="rgba(38, 38, 41, 0.6)"
      borderStartEndRadius="16px"
      alignItems="flex-start"
      rowGap="8px"
      justifyContent="space-between"
      height="full"
      position="fixed"
      left={0}
      top={0}
      zIndex={2}
      width={isOpen ? sidebarWidth.open : sidebarWidth.close}
      transition="width 0.3s ease"
    >
      <Button
        onClick={() => sidebarDispatcher((prev) => !prev)}
        borderRadius="full"
        position="absolute"
        top="16px"
        left={0}
        transform={isOpen ? "translateX(149px)" : "translateX(65px)"}
        width="36px"
        height="36px"
        bg="rgba(38, 38, 41,0.6)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: "rgba(38, 38, 41, 0.7)" }}
        _active={{ bg: "rgba(38, 38, 41, 0.8)" }}
        p="0px"
        transition="all 0.3 ease"
      >
        {isOpen ? (
          <FaAngleDoubleRight size={14} color="var(--chakra-colors-gray-0)" />
        ) : (
          <FaAngleDoubleLeft size={14} color="var(--chakra-colors-gray-0)" />
        )}
      </Button>
      <VStack width="full">
        <Center py="32px" width="full">
          <Img src={logoImg} alt="lumina" />
        </Center>
        {routes.map((route, index) => (
          <>
            {routes.length === index + 1 && (
              <Divider width="full" height="1px" borderColor="gray.400" />
            )}
            <ChakraLink
              key={route.id}
              href={route.href}
              {...(route.href === router.asPath && {
                bg: "gray.800",
                _before: {
                  content: "''",
                  position: "absolute",
                  left: "0",
                  top: "0",
                  height: "full",
                  width: "2px",
                  backgroundColor: "primary.300",
                },
              })}
            >
              <HStack>
                {route.icon(route.href === router.asPath)}
                {isOpen && <Text>{route.title}</Text>}
              </HStack>
            </ChakraLink>
          </>
        ))}
      </VStack>
      <ChakraLink
        {...("/settings" === router.asPath && {
          bg: "gray.800",
          _before: {
            content: "''",
            position: "absolute",
            left: "0",
            top: "0",
            height: "full",
            width: "2px",
            backgroundColor: "primary.300",
          },
        })}
        href="/setting"
      >
        <HStack>
          <Box
            {...("/setting" === router.asPath && {
              __css: {
                "&>svg>path": {
                  stroke: "primary.300 !important",
                },
              },
            })}
          >
            <Icon as={Setting} />
          </Box>
          {isOpen && <Text>Setting</Text>}
        </HStack>
      </ChakraLink>
    </VStack>
  );
};
