import { useContext } from "react";
import { SetUserProfile, UserProfile } from "./context";

export const useUserProfile = () => useContext(UserProfile);
export const useDispatchUserProfile = () => useContext(SetUserProfile);
