import { Action } from "@store/_type";
import Pemeliharaan from "./models/Pemeliharaan";

export type Dashboard = {
  pemeliharaan: {
    kel_total: string,
    kel_selesai: string,
    persentase: string
  }
};
export type State = {
  datas: Array<Pemeliharaan>,
  loading: boolean,
  dashboard: Dashboard,
  search: string
};
export const state: State = {
  datas: [],
  dashboard: {
    pemeliharaan: {
      kel_total: '0',
      kel_selesai: '0',
      persentase: '0%'
    }
  },
  loading: false,
  search: ''
}

export type PemeliharaanAction =  Action<'SET_PEMELIHARAAN', typeof state.datas> |
                          Action<'APPEND_PEMELIHARAAN', Pemeliharaan> |
                          Action<'PREPEND_PEMELIHARAAN', Pemeliharaan> |
                          Action<'EDIT_PEMELIHARAAN', { index: number, data: Pemeliharaan }> |
                          Action<'REMOVE_PEMELIHARAAN', number> |
                          Action<'SET_LOADING', boolean> |
                          Action<'SET_DASHBOARD', Dashboard> |
                          Action<'SET_SEARCH', string>

export const actions = (state: State, action: PemeliharaanAction) => {
  let datas = state.datas || [];
  switch (action.type) {
    case 'SET_PEMELIHARAAN':
      return {
        ...state,
        datas: action.payload
      }
    case 'APPEND_PEMELIHARAAN':
      return {
        ...state,
        datas: [...datas, action.payload]
      }
    case 'PREPEND_PEMELIHARAAN':
      return {
        ...state,
        datas: [action.payload, ...datas]
      }
    case 'REMOVE_PEMELIHARAAN':
      datas = datas.splice(action.payload, 1);
      return {
        ...state,
        datas: [...datas]
      }
    case 'EDIT_PEMELIHARAAN':
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