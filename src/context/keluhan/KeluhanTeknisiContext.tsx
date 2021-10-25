import React, { createContext, FC, useMemo } from "react";
import { KeluhanAction, State, state } from '@store/keluhan';
import { ContextProviderProps } from "@context/_type";
import { getKeluhan, tanganiKeluhan } from "@actions/keluhan";

const KeluhanTeknisiContext = createContext({
  state,
  getKeluhan,
  tanganiKeluhan,
});

export const KeluhanTeknisiContextProvider: FC<ContextProviderProps<State, KeluhanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    getKeluhan: async () => {
      await getKeluhan();
    },
    tanganiKeluhan: async () => {
      await tanganiKeluhan();
    },
  }), [state]);

  return (
    <KeluhanTeknisiContext.Provider value={context}>
      { children }
    </KeluhanTeknisiContext.Provider>
  );
}

export default KeluhanTeknisiContext;