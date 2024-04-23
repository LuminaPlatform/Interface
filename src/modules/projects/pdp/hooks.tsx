import { useContext } from "react";
import { ProjectDetail, ProjectDetailDispatch } from "./context";

export const useProjectData = () => useContext(ProjectDetail);
export const useProjectDataDispatch = () => useContext(ProjectDetailDispatch);
