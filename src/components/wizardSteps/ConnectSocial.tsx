// import { Dispatch, SetStateAction } from "react";
import { GridItem, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import { TbBrandXFilled } from "react-icons/tb";
import { useEffect, useMemo } from "react";
import { useDispatchGlobalUserData, useGlobalUserData } from "@/hooks/bases";
import { handleStorageChange, handleTwitterLogin } from "@/utils";
import { WizardContentBase } from "./Base";
import { ActionCard } from "../ActionCard";

export const ConnectSocial = () => {
  const globalUser = useGlobalUserData();
  const isConnect = useMemo(() => globalUser?.user?.x_username, [globalUser]);

  const dispatchGlobalUser = useDispatchGlobalUserData();

  useEffect(() => {
    window.addEventListener("storage", () =>
      handleStorageChange(dispatchGlobalUser, globalUser)
    );

    return () => {
      window.removeEventListener("storage", () =>
        handleStorageChange(dispatchGlobalUser, globalUser)
      );
    };
  }, []);

  return (
    <WizardContentBase>
      <GridItem>
        <Img
          width="288px"
          height="288px"
          src="/assets/images/setupWizard/marketing.png"
          alt="social wizard"
        />
      </GridItem>
      <GridItem>
        <VStack width="full">
          <Text
            mr="auto"
            color="gray.0"
            fontFamily="lexend"
            fontSize="xl"
            fontWeight="600"
          >
            Connect Social Accounts
          </Text>
          <HStack mb="16px">
            <Text color="gray.0" fontSize="md" lineHeight="21.6px" as="span">
              Hey, wanna see if you&apos;re in? Connect your Twitter and find
              out if you made the Beta cut! Curious about how we pick? Tap{" "}
              <Link
                rel="noopener Noreferrer"
                target="_blank"
                href="https://docs.lumina.credit"
                color="primary.300"
                fontWeight="500"
              >
                here
              </Link>{" "}
              to get the scoop! 🚀
            </Text>
          </HStack>
          <ActionCard
            text={
              isConnect
                ? `@${globalUser?.twitter?.data?.username}`
                : "Connect X"
            }
            logo={TbBrandXFilled}
            connect={{
              buttonText: "Connect",
              handleClick: () => {
                handleTwitterLogin();
              },
              isConnect,
              showConnect: true
            }}
          />
        </VStack>
      </GridItem>
    </WizardContentBase>
  );
};
