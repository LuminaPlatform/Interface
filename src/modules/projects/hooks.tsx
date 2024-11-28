import { useContext } from "react";
import { Projects, ProjectsDispatch } from "./context";

export const useProjects = () => {
  return useContext(Projects);
};

export const useProjectsDispatch = () => useContext(ProjectsDispatch);
