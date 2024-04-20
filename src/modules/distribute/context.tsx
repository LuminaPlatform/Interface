import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Project } from "./types";

export const SelectedProjects = createContext<Array<Project>>([]);
export const DispatchSelectedProjects = createContext<
  Dispatch<SetStateAction<Array<Project>>>
>(() => {});

interface ProjectsProviderProps extends PropsWithChildren {}
export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [state, setState] = useState<Array<Project>>([]);
  return (
    <SelectedProjects.Provider value={state}>
      <DispatchSelectedProjects.Provider value={setState}>
        {children}
      </DispatchSelectedProjects.Provider>
    </SelectedProjects.Provider>
  );
};
