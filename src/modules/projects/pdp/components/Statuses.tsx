import { Badge } from "@/components/Badge";
import { reviewStatuses } from "@/constant";
import { ReviewStatus } from "@/types";
import { HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { StatusesProps } from "../types";

export const Statuses = ({ status, setStatus }: StatusesProps) => {
  return (
    <HStack gap="16px" flexWrap="wrap">
      {reviewStatuses.map((item) => (
        <Badge
          cursor="pointer"
          onClick={() =>
            setStatus((prev) => {
              if (prev === item.name) {
                return undefined;
              }
              return item.name;
            })
          }
          key={item.id}
          title={reviewStatuses[item.id].name}
          colorScheme={reviewStatuses[item.id].colorScheme}
          icon={reviewStatuses[item.id].icon}
          fontSize="md"
          {...(item.name !== status && {
            color: "gray.80",
            border: "1px solid",
            borderColor: "gray.80",
            bg: "transparent",
            iconsProps: {
              color: "gray.200",
            },
          })}
        />
      ))}
    </HStack>
  );
};
