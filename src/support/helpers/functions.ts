import Params from "@support/http/contract/Params";
import { PermissionsAndroid } from "react-native";

export function ParamToFormData(param?: Params) {
  if (!param) return undefined;
  const form = new FormData();
  for (const key in param) {
    form.append(key, param[key]);
  }
  return form;
}

export const checkPermission = async (permission: string) => {
  const allow = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[permission]);
  if (!allow) {
    const user_choice = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permission]);
    return user_choice == 'granted';
  }

  return false;
}