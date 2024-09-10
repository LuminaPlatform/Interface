import { useContext } from "react";
import { ReviewsData } from "./context";

export const useReviewsData = () => useContext(ReviewsData);
