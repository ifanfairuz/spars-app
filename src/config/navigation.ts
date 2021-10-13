import { DOMAIN_URL, LOCAL_PROTOCOL } from "@env";

export default {
  linking: {
    prefixes: [LOCAL_PROTOCOL, DOMAIN_URL],
    config: {
      screens: {
        
      }
    },
  }
}