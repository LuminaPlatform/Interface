import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { Review } from "@/modules/projects/types";
import { ReviewsProvider } from "@/modules/reviews/context";
import Index from "@/modules/reviews/page/Index";
import { AuthenticationData } from "@/types";
import { GetServerSidePropsContext } from "next";
interface ReviewsProps {
  userData: AuthenticationData;
  reviews: Review[];
}
const Reviews = (props: ReviewsProps) => {
  return (
    <ReviewsProvider reviews={props.reviews}>
      <Index />
    </ReviewsProvider>
  );
};

export default Reviews;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const query = ctx.query;
  const tab = query.tab;

  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  const userData = await axiosClient
    .get(apiKeys["auth"]["isAuthorized"], {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(() => {
      return null;
    });

  if (typeof tab === "undefined" || tab === "for_you") {
    const response = await axiosClient.post(apiKeys["fetch"], {
      0: {
        model: "Review",
        model_id: "None",
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*",
            },
            {
              name: "files",
              graph: {
                fetch_fields: [
                  {
                    name: "*",
                  },
                ],
              },
            },
            {
              name: "user",
              graph: {
                fetch_fields: [
                  {
                    name: "display_name",
                  },
                  {
                    name: "id",
                  },
                  {
                    name: "profile_id",
                  },
                ],
              },
            },
            {
              name: "project",
              graph: {
                fetch_fields: [
                  {
                    name: "id",
                  },
                  {
                    name: "name",
                  },
                  {
                    name: "logo_id",
                  },
                  { name: "content.fundingSources" },
                  { name: "content.includedInBallots" },
                  { name: "content.applicantType" },
                  { name: "content.websiteUrl" },
                  { name: "content.bio" },
                  { name: "content.profile" },
                  { name: "content.applicant" },
                  { name: "content.contributionDescription" },
                  { name: "content.contributionLinks" },
                  { name: "content.impactDescription" },
                  { name: "content.impactMetrics" },
                  { name: "content.impactCategory" },
                ],
              },
            },
          ],
        },
      },
    });
    return {
      props: {
        userData: userData?.data ?? null,
        reviews: await response.data["0"],
      },
    };
  }

  const response = await axiosClient.post(apiKeys["fetch"], {
    0: {
      model: "Review",
      model_id: "None",
      orders: [
        {
          field: "createTimestamp",
          desc: true,
        },
      ],
      graph: {
        fetch_fields: [
          {
            name: "*",
          },
          {
            name: "files",
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
              ],
            },
          },
          {
            name: "user",
            graph: {
              fetch_fields: [
                {
                  name: "display_name",
                },
                {
                  name: "id",
                },
                {
                  name: "profile_id",
                },
              ],
            },
          },
          {
            name: "project",
            graph: {
              fetch_fields: [
                {
                  name: "id",
                },
                {
                  name: "name",
                },
                {
                  name: "logo_id",
                },
                { name: "content.fundingSources" },
                { name: "content.includedInBallots" },
                { name: "content.applicantType" },
                { name: "content.websiteUrl" },
                { name: "content.bio" },
                { name: "content.profile" },
                { name: "content.applicant" },
                { name: "content.contributionDescription" },
                { name: "content.contributionLinks" },
                { name: "content.impactDescription" },
                { name: "content.impactMetrics" },
                { name: "content.impactCategory" },
              ],
            },
          },
        ],
      },
    },
  });
  return {
    props: {
      test: "saalam",
      userData: userData?.data ?? null,
      reviews: response.data["0"],
    },
  };
};
