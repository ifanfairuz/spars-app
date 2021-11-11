import React, { createContext, FC, useMemo } from "react";
import { KeluhanAction, State, state } from '@store/keluhan';
import { ContextProviderProps } from "@context/_type";
import { getKeluhan, tanganiKeluhan } from "@actions/keluhan";

const KeluhanTeknisiContext = createContext({
  state,
  init: async () => {},
  getKeluhan,
  tanganiKeluhan,
});

export const KeluhanTeknisiContextProvider: FC<ContextProviderProps<State, KeluhanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    init: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
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
    tanganiKeluhan: async (id_keluhan: string, hasil_penanganan: string, catatan_teknisi: string = '', photos: string[] = []) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await tanganiKeluhan(id_keluhan, hasil_penanganan, catatan_teknisi, photos);
      dispatch({ type: 'SET_LOADING', payload: false });
      return datas;
    },
  }), [state]);

  return (
    <KeluhanTeknisiContext.Provider value={context}>
      { children }
    </KeluhanTeknisiContext.Provider>
  );
}

export default KeluhanTeknisiContext;