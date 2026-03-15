import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getItem<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e: any) {
      // Handle quota errors or serialization issues gracefully so UI doesn't feel "unresponsive"
      // Common in this app when saving large image/file attachments as data URLs
      console.error('LocalStorage setItem failed for key', key, e);
      const message = 'Save failed: Your browser\'s storage limit may be exceeded due to large attachments.\n\nPlease remove some files or attach smaller images, then try again.';
      try {
        // Notify the user; avoid throwing which would break the click handler flow
        if (typeof window !== 'undefined' && typeof window.alert === 'function') {
          window.alert(message);
        }
      } catch {
        // noop if alert is unavailable
      }
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
