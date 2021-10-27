import { Action, ActionNoPayload } from "@store/_type";
import User from "@store/models/User";

export type State = {
  user?: User,
  loading: boolean
  message: string
};
export const state: State = {
  user: undefined,
  loading: true,
  message: ''
}

export type AuthAction =  Action<'SET_USER', typeof state.user> |
                          ActionNoPayload<'REMOVE_USER'> |
                          Action<'SET_MESSAGE', string> |
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
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
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