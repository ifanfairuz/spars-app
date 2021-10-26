import React, { createContext, FC, useMemo } from "react";
import { KeluhanAction, State, state } from '@store/keluhan';
import { ContextProviderProps } from "@context/_type";
import { getAlat, getKeluhan, tambahKeluhan } from "@actions/keluhan";

const KeluhanUserContext = createContext({
  state,
  getKeluhan,
  tambahKeluhan,
  getAlat,
  search: (search: string) => {},
  setLoading: (loading: boolean) => {},
});

export const KeluhanUserContextProvider: FC<ContextProviderProps<State, KeluhanAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => ({
    state,
    getKeluhan: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await getKeluhan(state.search);
      dispatch({ type: 'SET_KELUHAN', payload: datas});
      dispatch({ type: 'SET_LOADING', payload: false });
      return datas;
    },
    tambahKeluhan: async (id_alat: string, no_seri: string, insiden?: string, deskripsi_keluhan?: string, photos: string[] = []) => {
      return await tambahKeluhan(id_alat, no_seri, insiden, deskripsi_keluhan, photos);
    },
    getAlat: async (key: string = '', page: number = 1, cancelable: boolean = false) => {
      return await getAlat(key, page, cancelable);
    },
    search: async (search: string) => {
      dispatch({ type: 'SET_SEARCH', payload: search });
      dispatch({ type: 'SET_LOADING', payload: true });
      const datas = await getKeluhan(search);
      dispatch({ type: 'SET_KELUHAN', payload: datas});
      dispatch({ type: 'SET_LOADING', payload: false });
    },
    setLoading: (loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }
  }), [state]);

  return (
    <KeluhanUserContext.Provider value={context}>
      { children }
    </KeluhanUserContext.Provider>
  );
}

export default KeluhanUserContext;