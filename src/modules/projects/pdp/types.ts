import { ReviewStatus } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { File } from "buffer";

export interface StatusesProps {
  status: ReviewStatus["name"];
  setStatus: Dispatch<SetStateAction<ReviewStatus["name"]>>;
}

export interface ReviewForm {
  title: string;
  description: string;
  medias: Array<FileList[0]>;
}
