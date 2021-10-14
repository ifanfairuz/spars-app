export type Action<T extends string, P> = { type: T, payload: P }
export type ActionNoPayload<T extends string> = { type: T }