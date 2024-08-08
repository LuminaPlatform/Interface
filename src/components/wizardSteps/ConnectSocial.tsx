import { Dispatch, SetStateAction, useState } from "react";
import { WizardContentBase } from "./Base";
import { GridItem, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import { ActionCard } from "../ActionCard";
import { TbBrandXFilled } from "react-icons/tb";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { useTwitterLogin } from "@/hooks/auth";

interface ConnectSocialProps {
  isConnect: boolean;
  setConnect: Dispatch<SetStateAction<boolean>>;
}
export const ConnectSocial = ({
  isConnect,
  setConnect
}: ConnectSocialProps) => {
  const [isLoadig, setLoading] = useState(false);

  const handleConnectX = async () => {
    axiosClient.get(apiKeys.auth.login.twitter.req).then((res) => {
      const { url } = res.data;
      console.log({ url });

      const openedWindow = window.open(url, "_blank", "width=500,height=600");
      const pollTimer = window.setInterval(function () {
        try {
          if (openedWindow.location.href.includes("callback")) {
            console.log(openedWindow.location.href);
            window.clearInterval(pollTimer);
            const urlParams = new URLSearchParams(openedWindow.location.search);
            // console.log(urlParams.get("code"), urlParams.get("state"));

            // setAuthorizationCode(urlParams.get("code"));
            openedWindow.close();
          }
        } catch (e) {
          console.log("Error:", e);
        }
      }, 500);
    });
  };
  const handleTwitterLogin = useTwitterLogin(() => {});

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
            actionCardId={0}
            text={isConnect ? "@twitter_username" : "Connect X"}
            logo={TbBrandXFilled}
            connect={{
              buttonText: "Connect",
              handleClick: () => {
                handleTwitterLogin(apiKeys.auth.login.twitter.req);
              },
              isConnect: isConnect,
              showConnect: true
            }}
          />
        </VStack>
      </GridItem>
    </WizardContentBase>
  );
};
