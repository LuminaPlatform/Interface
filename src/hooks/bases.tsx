import { DispatchIsSidebarOpen, IsSidebarOpen } from "@/context";
import { useContext } from "react";

export const useIsOpenSidebar = () => useContext(IsSidebarOpen);
export const useDispatchIsOpenSidebar = () => useContext(DispatchIsSidebarOpen);
