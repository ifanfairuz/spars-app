import React, { createContext, FC, useMemo } from "react";
import { KeluhanAction, State, state } from '@store/keluhan';
import { ContextProviderProps } from "@context/_type";
import { getKeluhan, approveKeluhan } from "@actions/keluhan";

const KeluhanKatimContext = createContext({
  state,
  getKeluhan,
  approveKeluhan,
});

export const KeluhanKatimContextProvider: FC<ContextProviderProps<State, KeluhanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    getKeluhan: async () => {
      await getKeluhan();
    },
    approveKeluhan: async () => {
      await approveKeluhan();
    },
  }), [state]);

  return (
    <KeluhanKatimContext.Provider value={context}>
      { children }
    </KeluhanKatimContext.Provider>
  );
}

export default KeluhanKatimContext;