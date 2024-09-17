import { axiosClient } from "@/config/axios";
import { apiKeys } from "./apiKeys";

export const checkUserEmailIsPublic = (userId: string) =>
  axiosClient
    .post(apiKeys.fetch, {
      "0": {
        model: "User",
        model_id: "None",
        limit: 1,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "email_public"
            }
          ]
        },
        condition: {
          field: "id",
          operator: "EQ",
          value: userId,
          __type__: "SimpleFetchCondition"
        }
      }
    })
    .then((res) => res.data[0]?.[0]?.email_public);

export const getUserInformation = async (
  id: string,
  accessToken: string,
  isSelfUser: boolean
) => {
  const isEmailPublic = await checkUserEmailIsPublic(id);
  return axiosClient
    .post(
      apiKeys.fetch,
      {
        0: (await (isEmailPublic || isSelfUser))
          ? {
              model: "User",
              model_id: "None",
              limit: 1,
              orders: [],
              graph: {
                fetch_fields: [
                  {
                    name: "*"
                  }
                ]
              },
              condition: {
                field: "id",
                operator: "EQ",
                value: id,
                __type__: "SimpleFetchCondition"
              }
            }
          : {
              model: "User",
              model_id: "None",
              limit: 1,
              orders: [],
              graph: {
                fetch_fields: [
                  { name: "id" },
                  { name: "email_public" },
                  { name: "display_name" },
                  { name: "profile_id" },
                  { name: "pined_wallet_id" },
                  { name: "status" },
                  { name: "terms_of_service_signature" },
                  { name: "info" },
                  { name: "createTimestamp" },
                  { name: "setting" },
                  { name: "x_username" },
                  { name: "username" }
                ]
              },
              condition: {
                field: "id",
                operator: "EQ",
                value: id,
                __type__: "SimpleFetchCondition"
              }
            },
        1: {
          model: "Wallet",
          model_id: "None",
          limit: 1,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*"
              }
            ]
          },
          condition: {
            field: "user_id",
            operator: "EQ",
            value: id,
            __type__: "SimpleFetchCondition"
          }
        },
        2: {
          model: "User.followers",
          model_id: id,
          orders: [],
          graph: {
            fetch_fields: [
              { name: "id" },
              { name: "email_public" },
              { name: "display_name" },
              { name: "profile_id" },
              { name: "pined_wallet_id" },
              { name: "status" },
              { name: "terms_of_service_signature" },
              { name: "info" },
              { name: "createTimestamp" },
              { name: "setting" },
              { name: "x_username" },
              { name: "username" }
            ]
          }
        },
        3: {
          model: "User.following",
          model_id: id,
          orders: [],
          graph: {
            fetch_fields: [
              { name: "id" },
              { name: "email_public" },
              { name: "display_name" },
              { name: "profile_id" },
              { name: "pined_wallet_id" },
              { name: "status" },
              { name: "terms_of_service_signature" },
              { name: "info" },
              { name: "createTimestamp" },
              { name: "setting" },
              { name: "x_username" },
              { name: "username" }
            ]
          }
        },
        4: {
          model: "User.interested_categories",
          model_id: id,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*"
              }
            ]
          }
        }
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
