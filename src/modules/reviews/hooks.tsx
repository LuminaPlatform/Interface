import { useContext } from "react";
import { DispatchReviewsData, ReviewsData } from "./context";

export const useReviewsData = () => useContext(ReviewsData);
export const useDispatchReviewsData = () => useContext(DispatchReviewsData);
