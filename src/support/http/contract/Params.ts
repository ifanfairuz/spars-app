export default interface Params extends Object {
  [key: string]: any;
}

export interface File {
  uri: string,
  name: string,
  type?: string
}