/* eslint-disable @typescript-eslint/no-explicit-any */
type StorageType = "local" | "session";

// Helper to check if code is running in browser environment
const isBrowser = typeof window !== "undefined";

const storageUtil = {
  store: (key: string, value: string | any, type: StorageType = "local") => {
    if (!isBrowser) return; // Skip if not in browser

    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;

    // For non-string values, stringify them
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    storage.setItem(key, valueToStore);

    try {
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      // Handle any event dispatch issues silently
      console.warn("Could not dispatch storage event", e);
    }
  },

  get: (key: string, type: StorageType = "local"): string | null => {
    if (!isBrowser) return null; // Return null if not in browser

    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;

    try {
      window.dispatchEvent(new Event("storage"));
    } catch (e: any) {
      console.log(e);
      // Handle any event dispatch issues silently
    }

    return storage.getItem(key);
  },

  // Helper to get and parse JSON objects from storage
  getObject: <T>(key: string, type: StorageType = "local"): T | null => {
    if (!isBrowser) return null;

    const data = storageUtil.get(key, type);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch (e) {
      console.warn(`Failed to parse stored item with key: ${key}`, e);
      return null;
    }
  },

  delete: (key: string, type: StorageType = "local") => {
    if (!isBrowser) return; // Skip if not in browser

    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;
    storage.removeItem(key);
  },

  clear: (type: StorageType = "local") => {
    if (!isBrowser) return; // Skip if not in browser

    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;
    storage.clear();
  }
};

export default storageUtil;
