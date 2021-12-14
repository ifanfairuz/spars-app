import React, { createContext, FC, useMemo } from "react";
import { PemeliharaanAction, State, state } from '@store/pemeliharaan';
import { ContextProviderProps } from "@context/_type";
import { getAlat } from "@actions/alat";
import { tambahPemeliharaan, getPemeliharaan } from "@actions/pemeliharaan";
import { Moment } from "moment";
import Pemeliharaan from "@store/models/Pemeliharaan";

const PemeliharaanKatimContext = createContext({
  state,
  getAlat,
  tambahPemeliharaan,
  init: async (date: Moment) => {},
  getPemeliharaan: async (date: Moment) => [] as Pemeliharaan[],
});

export const PemeliharaanKatimContextProvider: FC<ContextProviderProps<State, PemeliharaanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    getAlat,
    tambahPemeliharaan,
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
    <PemeliharaanKatimContext.Provider value={context}>
      { children }
    </PemeliharaanKatimContext.Provider>
  );
}

export default PemeliharaanKatimContext;