
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
export enum InterestModalBody {
  projects = "projects",
  people = "people",
}

export type SettingsModalsForm = {
  email: string;
  password: string;
  rePassword: string;
  currentPassword: string;
};
