import React, { createContext, FC, useMemo } from "react";
import { PemeliharaanAction, State, state } from '@store/pemeliharaan';
import { ContextProviderProps } from "@context/_type";
import { getPemeliharaan } from "@actions/pemeliharaan";
import { Moment } from "moment";
import Pemeliharaan from "@store/models/Pemeliharaan";

const PemeliharaanUserContext = createContext({
  state,
  init: async (date: Moment) => {},
  getPemeliharaan: async (date: Moment) => [] as Pemeliharaan[]
});

export const PemeliharaanUserContextProvider: FC<ContextProviderProps<State, PemeliharaanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    init: async (date: Moment) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await getPemeliharaan(date.format('YYYY-MM-DD'));
      dispatch({ type: 'SET_PEMELIHARAAN', payload: datas || [] });
      dispatch({ type: 'SET_LOADING', payload: false });
    },
    getPemeliharaan: async (date: Moment) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await getPemeliharaan(date.format('YYYY-MM-DD'));
      dispatch({ type: 'SET_PEMELIHARAAN', payload: datas || [] });
      dispatch({ type: 'SET_LOADING', payload: false });
      return datas;
    }
  }), [state]);

  return (
    <PemeliharaanUserContext.Provider value={context}>
      { children }
    </PemeliharaanUserContext.Provider>
  );
}

export default PemeliharaanUserContext;