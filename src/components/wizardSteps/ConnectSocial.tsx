import { Dispatch, SetStateAction } from "react";
import { WizardContentBase } from "./Base";
import { GridItem, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import { ActionCard } from "../ActionCard";
import { TbBrandXFilled } from "react-icons/tb";

interface ConnectSocialProps {
  isConnect: boolean;
  setConnect: Dispatch<SetStateAction<boolean>>;
}
export const ConnectSocial = ({
  isConnect,
  setConnect,
}: ConnectSocialProps) => {
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
                console.log(isConnect);
                
                setConnect(true);
              },
              isConnect: isConnect,
              showConnect: true,
            }}
          />
        </VStack>
      </GridItem>
    </WizardContentBase>
  );
};
