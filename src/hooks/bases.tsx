import {
  DispatchIsSidebarOpen,
  IsSidebarOpen,
  SelectedProjects,
  SetSelectedProjects,
  WalletConnectData,
} from "@/context";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useContext } from "react";

export const useIsOpenSidebar = () => useContext(IsSidebarOpen);
export const useDispatchIsOpenSidebar = () => useContext(DispatchIsSidebarOpen);

export const useWalletModal = () => useContext(WalletConnectData);

export const useSelectedProjects = () => useContext(SelectedProjects);
export const useDispatchSelectedProjects = () =>
  useContext(SetSelectedProjects);

export const useCustomToast = (args?: UseToastOptions) =>
  useToast({
    position: "bottom-left",
    duration: 3000,
    ...args,
  });
