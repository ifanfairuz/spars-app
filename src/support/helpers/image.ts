import config from "@config/app";

export function imageKeluhan(file: string) {
  return `${config.server.domain_url}/system/keluhan/${file}`;
}