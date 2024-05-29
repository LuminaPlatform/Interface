import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { useDispatchAuthorization } from "@/hooks/bases";
import { Review } from "@/modules/projects/types";
import { ReviewsProvider } from "@/modules/reviews/context";
import Index from "@/modules/reviews/page/Index";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ReviewsProps {
  isAuthorized?: boolean;
  reviews: Review[];
}
const Reviews = (props: ReviewsProps) => {
  const { query } = useRouter();

  const dispatchAuthorization = useDispatchAuthorization();
  useEffect(() => {
    if (!query?.tab || query.tab === "for_you") {
      const { isAuthorized } = props;
      dispatchAuthorization(isAuthorized);
    }
  }, []);
  console.log({ props });

  return (
    <ReviewsProvider reviews={props.reviews}>
      <Index />
    </ReviewsProvider>
  );
};

export default Reviews;

export const getServerSideProps = async (ctx) => {
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
                fetch_graph: {
                  flex_fields: [
                    {
                      name: "*",
                    },
                    {
                      name: "user",
                      fetch_graph: {
                        flex_fields: [
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
                      fetch_graph: {
                        flex_fields: [
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
                isAuthorized: true,
                reviews: await response.data["0"],
              },
            };
          }
        })
        .catch((error) => {
          return {
            props: {
              isAuthorized: false,
              reviews: [],
            },
          };
        });
    }

    return {
      props: {
        isAuthorized: false,
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
      fetch_graph: {
        flex_fields: [
          {
            name: "*",
          },
          {
            name: "user",
            fetch_graph: {
              flex_fields: [
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
      reviews: response.data["0"],
    },
  };
};
