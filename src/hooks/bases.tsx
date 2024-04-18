import {
  DispatchIsSidebarOpen,
  IsSidebarOpen,
  WalletConnectData,
} from "@/context";
import { useContext } from "react";

export const useIsOpenSidebar = () => useContext(IsSidebarOpen);
export const useDispatchIsOpenSidebar = () => useContext(DispatchIsSidebarOpen);

export const useWalletModal = () => useContext(WalletConnectData);
