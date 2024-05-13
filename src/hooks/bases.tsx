import {
  Authorization,
  DispatchIsSidebarOpen,
  IsSidebarOpen,
  SelectedProjects,
  SetAuthorization,
  SetSelectedProjects,
  WalletConnectData,
} from "@/context";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useContext } from "react";
import { wagmiConfig } from "@/config/wagmi";
import { useDisconnect } from "wagmi";

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

export const useAuthorization = () => useContext(Authorization);
export const useDispatchAuthorization = () => useContext(SetAuthorization);

export const useLogout = () => {
  const dispatchAuthorization = useDispatchAuthorization();

  const { disconnect, reset } = useDisconnect({
    config: wagmiConfig,
  });

  return async () => {
    disconnect();
    reset();
    localStorage.removeItem("access_token");
    dispatchAuthorization(false);
  };
};