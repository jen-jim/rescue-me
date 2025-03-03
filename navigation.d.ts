import { StackParamList } from "./App";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
