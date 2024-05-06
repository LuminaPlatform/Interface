import { OTPFormType } from "@/types";

export type settingsFormType = {
  profile: FileList[0];
  username: string;
  nickname: string;
};

export enum SettingsModalBody {
  emailVerify = "emailVerify",
  changeEmail = "changeEmail",
  emailOTP = "emailOTP",
  setPassword = "setPassword",
  changePassword = "changePassword",
  passwordOTP = "passwordOTP",
}

export type SettingsModalsForm = {
  email: string;
};
