import Params from "@support/http/contract/Params";

export function ParamToFormData(param?: Params) {
  if (!param) return undefined;
  const form = new FormData();
  for (const key in param) {
    form.append(key, param[key]);
  }
  return form;
}