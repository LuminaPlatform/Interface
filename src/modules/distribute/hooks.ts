import { useContext } from "react";
import { DispatchSelectedProjects, SelectedProjects } from "./context";

export const useSelectedProject = () => useContext(SelectedProjects);
export const useDispatchSelectedProject = () =>
  useContext(DispatchSelectedProjects);
