import { Action, ActionNoPayload } from "./_type";

export type State = {
  user?: {
    id_users: string,
    full_name: string,
    passcode: string,
    id_level: string,
    level_name: string,
    nama_rumah_sakit: string,
    foto: string,
  },
  loading: boolean
};
export const state: State = {
  user: undefined,
  loading: true
}

export type AuthAction =  Action<'SET_USER', typeof state.user> |
                          ActionNoPayload<'REMOVE_USER'> |
                          Action<'SET_LOADING', boolean>

export const actions = (state: State, action: AuthAction) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'REMOVE_USER':
      return {
        user: undefined,
        loading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

export default {
  state,
  actions
}