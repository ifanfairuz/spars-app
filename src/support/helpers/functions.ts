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
    switch (user_choice) {
      case PermissionsAndroid.RESULTS.GRANTED:
        return true;
      case PermissionsAndroid.RESULTS.DENIED:
        return false;
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[permission]);;
      default:
        return false;
    }
  }

  return false;
}