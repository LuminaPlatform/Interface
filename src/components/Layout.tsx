import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { Sidebar } from "./sidebar/Sidebar";
import { useIsOpenSidebar } from "@/hooks/bases";
import { sidebarWidth } from "@/constant";
import { PropsWithChildren } from "react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

interface LayoutProps extends PropsWithChildren {}
const Layout = ({ children }: LayoutProps) => {
  const isSidebarOpen = useIsOpenSidebar();
  return (
    <Grid
      minHeight="100vh"
      position="relative"
      gridTemplateColumns={{
        base: "100%",
        md: `${
          isSidebarOpen ? sidebarWidth.open : sidebarWidth.close
        } calc(100% - ${
          isSidebarOpen ? sidebarWidth.open : sidebarWidth.close
        })`,
      }}
    >
      <Box
        zIndex={0}
        position="fixed"
        top="0"
        left="0"
        boxShadow={`0 0 ${150}px ${150}px rgba(255,136,0,0.5)`}
        rounded="full"
        opacity="0.3"
        width="100px"
        height="100px"
        backgroundColor="rgba(255,136,0,0.5)"
      />
      <Box
        zIndex={0}
        position="fixed"
        bottom="0"
        left="0"
        boxShadow={`0 0 ${75}px ${75}px rgba(255,136,0,0.5)`}
        rounded="full"
        opacity="0.3"
        width="50px"
        height="50px"
        backgroundColor="rgba(255,136,0,0.5)"
      />
      <GridItem position="relative" display={{ base: "none", md: "flex" }}>
        <Sidebar />
      </GridItem>
      <GridItem>
        <Container pt={["12px"]} maxWidth="1280px" px={["20px", null, "24px"]}>
          <Navbar />
          {children}
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Layout;
