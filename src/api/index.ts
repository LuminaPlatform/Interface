import { axiosClient } from "@/config/axios";
import { apiKeys } from "./apiKeys";

export const getUserInformation = async (email: string) => {
  return await axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "User",
        model_id: "None",
        limit: 1,
        orders: [],
        fetch_graph: {
          flex_fields: [
            {
              name: "*",
            },
          ],
        },
        condition: {
          field: "email",
          operator: "EQ",
          value: email,
          __type__: "SimpleSearchCondition",
        },
      },
      1: {
        model: "Wallet",
        model_id: "None",
        limit: 1,
        orders: [],
        fetch_graph: {
          flex_fields: [
            {
              name: "*",
            },
          ],
        },
        condition: {
          field: "user.email",
          operator: "EQ",
          value: email,
          __type__: "SimpleSearchCondition",
        },
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log({ error });
    });
};
