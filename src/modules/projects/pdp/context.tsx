import { createContext, PropsWithChildren, useState } from "react";
import { ProjectDetailProps } from "./types";

interface ProjectDetailProviderProps extends PropsWithChildren {
  project: ProjectDetailProps["project"];
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
