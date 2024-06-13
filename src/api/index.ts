import { axiosClient } from "@/config/axios";
import { apiKeys } from "./apiKeys";

export const getUserInformation = async (id: string) => {
  console.log({ id });

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
          field: "id",
          operator: "EQ",
          value: id,
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
          field: "user_id",
          operator: "EQ",
          value: id,
          __type__: "SimpleSearchCondition",
        },
      },
    })
    .then((response) => {
      console.log({ res: response.data[1] });
      return response.data;
    })
    .catch((error) => {
      console.log({ error });
    });
};
