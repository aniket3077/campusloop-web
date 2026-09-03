export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing key "${key}" to localStorage`, e);
    }
  },

  getString(key: string, defaultValue = ''): string {
    return localStorage.getItem(key) || defaultValue;
  },

  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};
