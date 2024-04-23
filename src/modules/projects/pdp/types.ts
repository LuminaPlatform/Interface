import { ReviewStatus } from "@/types";
import { tableData } from "../constant";
import { Dispatch, SetStateAction } from "react";
import { File } from "buffer";

export interface ProjectDetailProps {
  project: (typeof tableData)[0];
}

export interface StatusesProps {
  status: ReviewStatus["id"];
  setStatus: Dispatch<SetStateAction<number>>;
}

export interface ReviewForm {
  title: string;
  description: string;
  // TODO should fixed any type
  medias: Array<FileList[0]>;
}
