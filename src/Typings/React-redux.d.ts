import "react-redux";
import { RootState } from "../Store/Reducers";

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}
