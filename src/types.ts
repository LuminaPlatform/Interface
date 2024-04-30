import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

export enum STEP_MODAL {
  "wallet" = "wallet",
  "login" = "login",
  "otp" = "otp",
  "register" = "register",
  "connectors" = "connectors",
}

export interface WalletModalBodyProps {
  setStep: Dispatch<SetStateAction<STEP_MODAL>>;
}

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
