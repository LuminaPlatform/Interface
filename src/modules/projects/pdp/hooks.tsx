import { useContext } from "react";
import {
  ProjectDetail,
  ProjectDetailDispatch,
  ProjectReviews,
  ProjectReviewsDispatch
} from "./context";

export const useProjectData = () => useContext(ProjectDetail);
export const useProjectDataDispatch = () => useContext(ProjectDetailDispatch);

export const useProjectReviews = () => useContext(ProjectReviews);
export const useProjectReviewsDispatch = () =>
  useContext(ProjectReviewsDispatch);
