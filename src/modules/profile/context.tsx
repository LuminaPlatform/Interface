import { createContext, PropsWithChildren, useState } from "react";

export const UserProfile = createContext(undefined);
export const SetUserProfile = createContext(undefined);

interface UserProfileProviderProps extends PropsWithChildren {
  // TODO should fix type
  data: any;
}
export const UserProfileProvider = ({
  children,
  data
}: UserProfileProviderProps) => {
  const [state, setState] = useState(data);

  return (
    <UserProfile.Provider value={state}>
      <SetUserProfile.Provider value={setState}>
        {children}
      </SetUserProfile.Provider>
    </UserProfile.Provider>
  );
};
