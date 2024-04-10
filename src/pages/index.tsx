import { Container, Text } from "@chakra-ui/react";

export default function Home() {
  return <Text color="gray.0">sa;a,</Text>;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/projects",
    },
  };
};
