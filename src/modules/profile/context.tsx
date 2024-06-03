import { createContext, PropsWithChildren, useState } from "react";

export const UserProfile = createContext(undefined);
export const SetUserProfile = createContext(undefined);

interface UserProfileProvider extends PropsWithChildren {
  // TODO should fix type
  data: any;
}
export const UserProfileProvider = ({
  children,
  data,
}: UserProfileProvider) => {
  const [state, setState] = useState(data);
  console.log({ data });

  return (
    <UserProfile.Provider value={state}>
      <SetUserProfile.Provider value={setState}>
        {children}
      </SetUserProfile.Provider>
    </UserProfile.Provider>
  );
};
