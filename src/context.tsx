import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Project } from "./modules/projects/types";

export const IsSidebarOpen = createContext(true);
export const DispatchIsSidebarOpen = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

interface IsSidebarOpenProviderProps extends PropsWithChildren {}
export const IsSidebarOpenProvider = ({
  children,
}: IsSidebarOpenProviderProps) => {
  const [state, setState] = useState(true);
  return (
    <IsSidebarOpen.Provider value={state}>
      <DispatchIsSidebarOpen.Provider value={setState}>
        {children}
      </DispatchIsSidebarOpen.Provider>
    </IsSidebarOpen.Provider>
  );
};

export const WalletConnectData = createContext<UseDisclosureProps>({});

interface WalletConnectProviderProps extends PropsWithChildren {}
export const WalletConnectProvider = ({
  children,
}: WalletConnectProviderProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <WalletConnectData.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </WalletConnectData.Provider>
  );
};

export const SelectedProjects = createContext<Array<Project>>(undefined);
export const SetSelectedProjects =
  createContext<Dispatch<SetStateAction<Project[]>>>(undefined);

interface SelectedProjectProviderProps extends PropsWithChildren {}
export const SelectedProjectProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<Array<Project>>([]);
  return (
    <SelectedProjects.Provider value={state}>
      <SetSelectedProjects.Provider value={setState}>
        {children}
      </SetSelectedProjects.Provider>
    </SelectedProjects.Provider>
  );
};
