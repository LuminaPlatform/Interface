import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const Projects = createContext(undefined);
export const ProjectsDispatch = createContext(undefined);

interface ProjectsProviderProps extends PropsWithChildren {
  data: any;
}
export const ProjectsProvider = ({ children, data }: ProjectsProviderProps) => {
  const [state, setState] = useState(data);

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <Projects.Provider value={state}>
      <ProjectsDispatch.Provider value={setState}>
        {children}
      </ProjectsDispatch.Provider>
    </Projects.Provider>
  );
};
