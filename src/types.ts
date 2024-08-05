import { IconType } from "react-icons";

export enum STEP_MODAL {
  "wallet" = "wallet",
  "login" = "login",
  "otp" = "otp",
  "register" = "register",
  "connectors" = "connectors",
  "setupWizard" = "setupWizard",
  "sign" = "sign",
  "verified" = "verified",
}

export interface WalletModalBodyProps {}
export interface OTPProps {
  handleClick: ({ ...args }?: any) => void;
  backIconHandler?: () => void;
}

export type OTPFormType = {
  otp: string[];
};

export interface ModalForm {
  email: string;
  password: string;
  isAccepted?: boolean;
}

export type ReviewStatus = {
  id: number;
  name: string;
  colorScheme: string;
  icon: IconType;
};

export type ApiErrorType = {
  error_message: string;
  error_detail: string;
};

export type SetupWizardForm = {
  username: string;
  nickname: string;
  profile: FileList[0];
  interests: Array<number>;
};

export enum Badges {
  "BASE" = "BASE",
  "USER" = "USER",
  "HOLDER" = "HOLDER",
}

export type FetchObject = {
  model: "Project" | "Project.reviews" | "Project.user";
  model_id: string;
  limit: number;
  orders: [];
  graph: {
    fetch_fields: {}[];
  };
  condition: {};
};

export type AuthenticationData = {
  username: string | null;
  email: string;
  id: number;
  createTimestamp: string;
};
