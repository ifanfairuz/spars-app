import config from "@config/app";
import { Asset } from "react-native-image-picker";

export function imageProfile(file?: string) {
  if (!file || file == '') return '';
  return `${config.server.domain_url}/system/images/user/${file}`;
}

export function imageKeluhan(file: string) {
  return `${config.server.domain_url}/system/keluhan/${file}`;
}

export function imagePenanganan(file: string) {
  return `${config.server.domain_url}/system/penanganan/${file}`;
}

export function imageAssetToBase64Uri(image: Asset) {
  return image ? `data:${image.type};base64,${image.base64}` : '';
}