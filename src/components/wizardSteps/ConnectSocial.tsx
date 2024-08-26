// import { Dispatch, SetStateAction } from "react";
import { GridItem, HStack, Img, Link, Text, VStack } from "@chakra-ui/react";
import { TbBrandXFilled } from "react-icons/tb";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { useEffect, useMemo } from "react";
import { TWITTER_INFO } from "@/constant";
import { useDispatchGlobalUserData, useGlobalUserData } from "@/hooks/bases";
import { WizardContentBase } from "./Base";
import { ActionCard } from "../ActionCard";

// {
//   "pinned_tweet_id": "1290424382007934977",
//   "description": "",
//   "name": "M.Hossein",
//   "most_recent_tweet_id": "1472301578421997570",
//   "protected": true,
//   "id": "874709183668551680",
//   "username": "sir_ho3ein99",
//   "profile_image_url": "https://pbs.twimg.com/profile_images/1710208722381701120/9kYqytfa_normal.jpg",
//   "verified": false,
//   "created_at": "2017-06-13T19:24:55.000Z",
//   "public_metrics": {
//       "followers_count": 53,
//       "following_count": 441,
//       "tweet_count": 255,
//       "listed_count": 0,
//       "like_count": 1092
//   },
//   "verified_type": "none"
// }

export const ConnectSocial = () => {
  const globalUser = useGlobalUserData();
  const isConnect = useMemo(() => globalUser.user.x_username, [globalUser]);

  const dispatchGlobalUser = useDispatchGlobalUserData();
  const handleTwitterLogin = () => {
    return axiosClient.get(apiKeys.auth.login.twitter.req).then((resp) => {
      window.open(resp.data.url, "_blank", "width=500,height=600");
    });
  };

  const handleStorageChange = () => {
    const twitterInfo = localStorage.getItem(TWITTER_INFO);
    if (twitterInfo) {
      const { ...data } = JSON.parse(localStorage.getItem(TWITTER_INFO));
      dispatchGlobalUser({
        ...globalUser,
        user: { ...globalUser.user, x_username: data.data.username },
        twitter: data
      });
      localStorage.removeItem(TWITTER_INFO);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
