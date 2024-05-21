import { createContext, PropsWithChildren, useState } from "react";

export const Projects = createContext(undefined);

interface ProjectsProviderProps extends PropsWithChildren {
  data: any;
}
export const ProjectsProvider = ({ children, data }: ProjectsProviderProps) => {
  const [state] = useState(data);
  return <Projects.Provider value={state}>{children}</Projects.Provider>;
};
