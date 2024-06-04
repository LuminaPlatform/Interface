import { getUserInformation } from "@/api";
import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { UserProfileProvider } from "@/modules/profile/context";
import { Index } from "@/modules/profile/pages/Index";

interface ProfileProps {
  isSelfUser: boolean;
  // TODO should fixed type
  user: any;
  wallet: any;
}
const Profile = ({ user, isSelfUser, wallet }: ProfileProps) => {
  console.log({ user, wallet });

  return (
    <UserProfileProvider data={{ isSelfUser, user, wallet }}>
      <Index />;
    </UserProfileProvider>
  );
};
export default Profile;

export const getServerSideProps = async (ctx) => {
  const { username } = ctx.params;
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  const userProfileData = await getUserInformation(username);
  // if (!userProfileData) {
  //   console.log("render");

  //   return {
  //     notFound: true,
  //   };
  // }
  try {
    const response = await axiosClient.get(apiKeys.auth.isAuthorized, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const selfUserData = response.data;
    return {
      props: {
        isSelfUser: selfUserData?.email === username,
        user: userProfileData[0][0],
        wallet: userProfileData[1][0],
      },
    };
  } catch (error) {
    return {
      props: {
        isSelfUser: false,
        user: userProfileData[0][0],
        wallet: userProfileData[1][0],
      },
    };
  }
};
