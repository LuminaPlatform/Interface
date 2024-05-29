import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Review } from "../projects/types";

type ReviewProps = Review[];
export const ReviewsData = createContext<ReviewProps>(undefined);
export const DispatchReviewsData =
  createContext<Dispatch<SetStateAction<ReviewProps>>>(undefined);

interface ReviewsProviderProps extends PropsWithChildren {
  reviews: ReviewProps;
}
export const ReviewsProvider = ({
  children,
  reviews,
}: ReviewsProviderProps) => {
  const [state, setState] = useState(reviews);
  return (
    <ReviewsData.Provider value={state}>
      <DispatchReviewsData.Provider value={setState}>
        {children}
      </DispatchReviewsData.Provider>
    </ReviewsData.Provider>
  );
};
