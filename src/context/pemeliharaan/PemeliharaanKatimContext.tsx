import React, { createContext, FC, useMemo } from "react";
import { PemeliharaanAction, State, state } from '@store/pemeliharaan';
import { ContextProviderProps } from "@context/_type";
import { getAlat } from "@actions/alat";

const PemeliharaanKatimContext = createContext({
  state,
  getAlat,
});

export const PemeliharaanKatimContextProvider: FC<ContextProviderProps<State, PemeliharaanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    getAlat,
  }), [state]);

  return (
    <PemeliharaanKatimContext.Provider value={context}>
      { children }
    </PemeliharaanKatimContext.Provider>
  );
}

export default PemeliharaanKatimContext;