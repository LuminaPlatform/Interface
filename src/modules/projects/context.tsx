import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const Projects = createContext(undefined);

interface ProjectsProviderProps extends PropsWithChildren {
  data: any;
}
export const ProjectsProvider = ({ children, data }: ProjectsProviderProps) => {
  return <Projects.Provider value={data}>{children}</Projects.Provider>;
};
