import config from "@config/app";
import { Toast } from "native-base";
import RNFetchBlob from 'rn-fetch-blob'

export function filePemeliharaan(file: string) {
  return `${config.server.domain_url}/system/assets/files/pemeliharaan/${file}`;
}

export function download(url: string) {
  return RNFetchBlob.fetch('GET', url)
  .then(res => {
    Toast.show({ title: `File disimpan di ${res.path()}`, status: 'success'  });
  })
  .catch(err => {
    Toast.show({ title: err.message || 'Gagal Download File', status: 'error'  });
  });
}