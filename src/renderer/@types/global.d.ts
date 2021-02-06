declare global {
  interface Window {
    cache: Chache;
  }
}

export interface Chache {
  save: <T>(key: string, value: T) => Promise<void>;
  find: <T>(key: string) => Promise<T>;
}
