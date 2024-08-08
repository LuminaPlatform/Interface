import { axiosClient } from "@/config/axios";
import { apiKeys } from "./apiKeys";

export const getUserInformation = async (id: string) => {
  return axiosClient
    .post(apiKeys.fetch, {
      0: {
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
            {
              name: "*"
            }
          ]
        }
      },
      3: {
        model: "User.following",
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
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
