import React, { createContext, FC, useMemo } from "react";
import { KeluhanAction, State, state } from '@store/keluhan';
import { ContextProviderProps } from "@context/_type";
import { getKeluhan, approveKeluhan, getTeknisi } from "@actions/keluhan";
import { getKatimDashboard } from "@actions/dashboard";

const KeluhanKatimContext = createContext({
  state,
  init: async (date: string) => {},
  getKeluhan,
  getTeknisi,
  approveKeluhan
});

export const KeluhanKatimContextProvider: FC<ContextProviderProps<State, KeluhanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    init: async (date: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const dashboard = await getKatimDashboard(date);
      dispatch({ type: 'SET_DASHBOARD', payload: dashboard});
      const datas = await getKeluhan('', false, false);
      dispatch({ type: 'SET_KELUHAN', payload: datas});
      dispatch({ type: 'SET_LOADING', payload: false });
    },
    getKeluhan: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await getKeluhan('', false, false);
      dispatch({ type: 'SET_KELUHAN', payload: datas});
      dispatch({ type: 'SET_LOADING', payload: false });
      return datas;
    },
    getTeknisi: async () => {
      return await getTeknisi();
    },
    approveKeluhan: async (id_keluhan: string, id_teknisi: string, memo: string = '') => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await approveKeluhan(id_keluhan, id_teknisi, memo);
      dispatch({ type: 'SET_LOADING', payload: false });
      return datas;
    },
  }), [state]);

  return (
    <KeluhanKatimContext.Provider value={context}>
      { children }
    </KeluhanKatimContext.Provider>
  );
}

export default KeluhanKatimContext;