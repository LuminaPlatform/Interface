import { createContext, PropsWithChildren } from "react";
import { Review } from "../projects/types";

type ReviewProps = Review[];
export const ReviewsData = createContext<ReviewProps>(undefined);

interface ReviewsProviderProps extends PropsWithChildren {
  reviews: ReviewProps;
}
export const ReviewsProvider = ({
  children,
  reviews
}: ReviewsProviderProps) => {
  return (
    <ReviewsData.Provider value={reviews}>{children}</ReviewsData.Provider>
  );
};
