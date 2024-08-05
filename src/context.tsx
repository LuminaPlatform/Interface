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
import { AuthenticationData, STEP_MODAL } from "./types";
import { getUserInformation } from "./api";
import { useAuthorization } from "./hooks/bases";
import { useDisconnect } from "wagmi";

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

export const SelectedProjects = createContext<Array<Project>>([]);
export const SetSelectedProjects =
  createContext<Dispatch<SetStateAction<Project[]>>>(undefined);

interface SelectedProjectProviderProps extends PropsWithChildren {}
export const SelectedProjectProvider = ({
  children,
}: SelectedProjectProviderProps) => {
  const [state, setState] = useState<Array<Project>>([]);
  return (
    <SelectedProjects.Provider value={state}>
      <SetSelectedProjects.Provider value={setState}>
        {children}
      </SetSelectedProjects.Provider>
    </SelectedProjects.Provider>
  );
};

export const Authorization = createContext<AuthenticationData>(undefined);
export const SetAuthorization =
  createContext<Dispatch<SetStateAction<AuthenticationData>>>(undefined);

interface AuthorizationProviderProps extends PropsWithChildren {
  data: AuthenticationData;
}
export const AuthorizationProvider = ({
  children,
  data,
}: AuthorizationProviderProps) => {
  const [user, setUser] = useState(data);

  useEffect(() => {
    setUser(data);
  }, [data]);
  return (
    <Authorization.Provider value={user}>
      <SetAuthorization.Provider value={setUser}>
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

export const GlobalUser = createContext<{
  user: any;
  wallet: any;
  followers: any;
  followings: any;
}>(undefined);
export const SetGlobalUser = createContext<
  Dispatch<
    SetStateAction<{
      user: any;
      wallet: any;
      followers: any;
      followings: any;
    }>
  >
>(undefined);

interface GlobalUserProviderProps extends PropsWithChildren {
  userData: any;
}

export const GlobalUserProvider = ({
  children,
  userData,
}: GlobalUserProviderProps) => {
  const [state, setState] = useState<{
    user: any;
    wallet: any;
    followers: any;
    followings: any;
  }>(userData ?? undefined);

  const userBaseData = useAuthorization();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (!!userBaseData) {
      getUserInformation(userBaseData.id.toString()).then((data) => {
        if (!!data) {
          setState({
            user: data[0][0],
            wallet: data[1],
            followers: data[2],
            followings: data[3],
          });
        }
      });
    } else {
      setState(undefined);
      disconnect();
    }
  }, [userBaseData, userData]);

  return (
    <GlobalUser.Provider value={state}>
      <SetGlobalUser.Provider value={setState}>
        {children}
      </SetGlobalUser.Provider>
    </GlobalUser.Provider>
  );
};
