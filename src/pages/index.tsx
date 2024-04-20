import { Container, Text } from "@chakra-ui/react";
import { useBlockNumber } from "wagmi";

export default function Home() {
  return <></>;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/projects",
    },
  };
};
