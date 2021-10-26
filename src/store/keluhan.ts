import { Action } from "@store/_type";
import Keluhan from "./models/Keluhan";

export type Dashboard = {
  keluhan: {
    kel_total: string,
    kel_selesai: string,
    persentase: string
  }
};
export type State = {
  datas: Array<Keluhan>,
  loading: boolean,
  dashboard: Dashboard,
  search: string
};
export const state: State = {
  datas: [],
  dashboard: {
    keluhan: {
      kel_total: '0',
      kel_selesai: '0',
      persentase: '0%'
    }
  },
  loading: false,
  search: ''
}

export type KeluhanAction =  Action<'SET_KELUHAN', typeof state.datas> |
                          Action<'APPEND_KELUHAN', Keluhan> |
                          Action<'PREPEND_KELUHAN', Keluhan> |
                          Action<'EDIT_KELUHAN', { index: number, data: Keluhan }> |
                          Action<'REMOVE_KELUHAN', number> |
                          Action<'SET_LOADING', boolean> |
                          Action<'SET_DASHBOARD', Dashboard> |
                          Action<'SET_SEARCH', string>

export const actions = (state: State, action: KeluhanAction) => {
  let datas = state.datas || [];
  switch (action.type) {
    case 'SET_KELUHAN':
      return {
        ...state,
        datas: action.payload
      }
    case 'APPEND_KELUHAN':
      return {
        ...state,
        datas: [...datas, action.payload]
      }
    case 'PREPEND_KELUHAN':
      return {
        ...state,
        datas: [action.payload, ...datas]
      }
    case 'REMOVE_KELUHAN':
      datas = datas.splice(action.payload, 1);
      return {
        ...state,
        datas: [...datas]
      }
    case 'EDIT_KELUHAN':
      var { index, data } = action.payload;
      datas[index] = data;
      return {
        ...state,
        datas: [...datas]
      }
    case 'SET_DASHBOARD':
      return {
        ...state,
        dashboard: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload
      }
    default:
      return state;
  }
}

export default {
  state,
  actions
}