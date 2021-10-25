import { Dispatch, PropsWithChildren } from "react";

export type ContextProviderProps<S, A> = PropsWithChildren<{
  state: S,
  dispatch: Dispatch<A>
}>