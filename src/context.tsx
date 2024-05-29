import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Project } from "./modules/projects/types";
import { useAccount } from "wagmi";
import { ACCESS_TOKEN_COOKIE_KEY } from "./constant";
import { getCookie } from "cookies-next";
import { STEP_MODAL } from "./types";

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

export const Authorization = createContext(undefined);
export const SetAuthorization = createContext(undefined);

interface AuthorizationProviderProps extends PropsWithChildren {
  isAuthenticated: boolean;
}
export const AuthorizationProvider = ({
  children,
  isAuthenticated,
}: AuthorizationProviderProps) => {
  const { isConnected } = useAccount();
  const [isAuthenticate, setAuthenticate] = useState(
    () => isAuthenticated || isConnected
  );

  // useEffect(() => {
  //   if (!isConnected || !isAuthenticated) {
  //     setAuthenticate(false);
  //   } else {
  //     setAuthenticate(true);
  //   }
  // }, [isConnected]);

  return (
    <Authorization.Provider value={isAuthenticate}>
      <SetAuthorization.Provider value={setAuthenticate}>
        {children}
      </SetAuthorization.Provider>
    </Authorization.Provider>
  );
};

export const ModalSteps = createContext<STEP_MODAL>(STEP_MODAL.wallet);
export const SetModalSteps =
  createContext<Dispatch<SetStateAction<STEP_MODAL>>>(undefined);
interface ModalStepsProviderProps extends PropsWithChildren {}
export const ModalStepsProvider = ({ children }: ModalStepsProviderProps) => {
  const [state, setState] = useState(STEP_MODAL.wallet);
  return (
    <ModalSteps.Provider value={state}>
      <SetModalSteps.Provider value={setState}>
        {children}
      </SetModalSteps.Provider>
    </ModalSteps.Provider>
  );
};
