import { useContext } from "react";
import { Projects } from "./context";

export const useProjects = () => {
  return useContext(Projects);
};
