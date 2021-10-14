import server from "./server";
import navigation from "./navigation";

const app = {
  server: server,
  navigation: navigation,
  storage: {
    key: '@spars-store'
  }
} as const;

export type Config = typeof app;
export default app;