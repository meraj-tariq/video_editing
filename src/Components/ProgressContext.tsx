import { createContext } from "react";
import { TProgressData } from "../Types/Video";

export type TEditInfo = {
  original?: string;
  id: string;
  clip?: boolean;
  resize?: boolean;
  ratio?: { x: number; y: number } | null;
  dimensions?: { x: number; y: number } | null;
  start_time?: string;
  end_time?: string;
};

export type TFormDataProps = {
  isSaved: boolean;
  setSaved: (arg: boolean) => void;
  disableProgress: boolean;
  setProgressDisabled?: (arg: boolean) => void;
  editInfo: TEditInfo;
  setEditInfo: (data: TEditInfo) => void;
  progressData: TProgressData | null;
};

export const initialData = {
  original: "",
  id: "",
  clip: false,
  resize: false,
  ratio: null,
  dimensions: null,
  start_time: "",
  end_time: "",
};

export const ProgressContext = createContext<TFormDataProps>({
  isSaved: false,
  setSaved: () => false,
  disableProgress: false,
  setProgressDisabled: () => false,
  editInfo: initialData,
  setEditInfo: () => {},
  progressData: null,
});
