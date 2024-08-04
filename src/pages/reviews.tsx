import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { useDispatchAuthorization } from "@/hooks/bases";
import { Review } from "@/modules/projects/types";
import { ReviewsProvider } from "@/modules/reviews/context";
import Index from "@/modules/reviews/page/Index";
import { AuthenticationData } from "@/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ReviewsProps {
  userData: AuthenticationData;
  reviews: Review[];
}
const Reviews = (props: ReviewsProps) => {
  const { query } = useRouter();

  const dispatchAuthorization = useDispatchAuthorization();
  useEffect(() => {
    if (!query?.tab || query.tab === "for_you") {
      const { userData } = props;
      dispatchAuthorization(userData);
    }
  }, []);

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
  // 1st check user is authorized or not
  if (typeof tab === "undefined" || tab === "for_you") {
    if (accessToken) {
      return axiosClient
        .get(apiKeys["auth"]["isAuthorized"], {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(async (response) => {
          if (response.status === 200) {
            // TODO this api should change for specific user
            const response = await axiosClient.post(apiKeys["fetch"], {
              0: {
                model: "Review",
                model_id: "None",
                limit: 20,
                orders: [],
                graph: {
                  fetch_fields: [
                    {
                      name: "*",
                    },
                    {
                      name: "user",
                      graph: {
                        fetch_fields: [
                          {
                            name: "display_name",
                          },
                          {
                            name: "profile_picture",
                          },
                        ],
                      },
                    },
                    {
                      name: "project",
                      graph: {
                        fetch_fields: [
                          {
                            name: "*",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            });
            return {
              props: {
                userData: response.data,
                reviews: await response.data["0"],
              },
            };
          }
        })
        .catch((error) => {
          console.log(error);

          return {
            props: {
              userData: null,
              reviews: [],
            },
          };
        });
    }

    return {
      props: {
        userData: null,
        reviews: [],
      },
    };
  }
  const response = await axiosClient.post(apiKeys["fetch"], {
    0: {
      model: "Review",
      model_id: "None",
      limit: 20,
      orders: [],
      graph: {
        fetch_fields: [
          {
            name: "*",
          },
          {
            name: "user",
            graph: {
              fetch_fields: [
                {
                  name: "display_name",
                },
                {
                  name: "profile_picture",
                },
              ],
            },
          },
        ],
      },
    },
  });
  return {
    props: {
      userData: null,
      reviews: response.data["0"],
    },
  };
};
