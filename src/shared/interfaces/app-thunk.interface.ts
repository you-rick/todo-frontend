import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {RootStateInterface} from "./root-state.intefrace";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateInterface,
  unknown,
  Action<string>
>
