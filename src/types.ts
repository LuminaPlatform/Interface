import { Dispatch, SetStateAction } from "react";

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
