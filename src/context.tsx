import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

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
