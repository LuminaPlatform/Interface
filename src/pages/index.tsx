
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
