import server from "./server";
import navigation from "./navigation";

const app = {
  server: server,
  navigation: navigation
} as const;

export type Config = typeof app;
export default app;