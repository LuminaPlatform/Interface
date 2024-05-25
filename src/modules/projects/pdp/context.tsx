import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Project, Review } from "../types";

interface ProjectDetailProviderProps extends PropsWithChildren {
  project: Project;
}
export const ProjectDetail =
  createContext<ProjectDetailProviderProps["project"]>(undefined);
export const ProjectDetailDispatch = createContext((arg: any) => {});

export const ProjectDetailProvider = ({
  project,
  children,
}: ProjectDetailProviderProps) => {
  const [state, setState] =
    useState<ProjectDetailProviderProps["project"]>(project);
  return (
    <ProjectDetail.Provider value={state}>
      <ProjectDetailDispatch.Provider value={setState}>
        {children}
      </ProjectDetailDispatch.Provider>
    </ProjectDetail.Provider>
  );
};

export const ProjectReviews = createContext<Review[]>(undefined);
export const ProjectReviewsDispatch =
  createContext<Dispatch<SetStateAction<Review[]>>>(undefined);
interface ProjectReviewsProviderProps extends PropsWithChildren {
  reviews: Review[];
}

export const ProjectReviewsProvider = ({
  children,
  reviews,
}: ProjectReviewsProviderProps) => {
  const [state, setState] = useState<Review[]>(reviews);
  return (
    <ProjectReviews.Provider value={state}>
      <ProjectReviewsDispatch.Provider value={setState}>
        {children}
      </ProjectReviewsDispatch.Provider>
    </ProjectReviews.Provider>
  );
};
