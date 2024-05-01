import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { Index } from "@/modules/profile/pages/Index";

const profile = () => {
  return <Index />;
};

export default profile;

// TODO fixed authorization
// export const getServerSideProps = async (ctx) => {
//   try {
//     const response = await axiosClient.get(apiKeys.auth.isAuthorized);
//     if (response.status !== 200) {
//       return {
//         props: {
//           isAuthorized: false,
//         },
//       };
//     }
//     return {
//       props: {
//         isAuthorized: true,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         isAuthorized: false,
//       },
//     };
//   }
// };
