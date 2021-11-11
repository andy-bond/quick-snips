import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LOCAL_STORAGE, SESSION_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Use localStorage for persisting data between browser exits
  // Use sessionStorage for data that will disappear upon browser exit
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: Storage,
    @Inject(SESSION_STORAGE) private sessionStorage: Storage
  ) {}

  // Retrieve a value from storage
  get(medium: 'local' | 'session', key: string): string | null {
    key = `${environment.name}-${key}`;
    if (medium === 'local' && this.localStorage) {
      return this.localStorage.getItem(key);
    } else if (medium === 'session' && this.sessionStorage) {
      return this.sessionStorage.getItem(key);
    }
    return null;
  }

  // Set a value in storage
  set(medium: 'local' | 'session', key: string, value: string): void {
    key = `${environment.name}-${key}`;
    if (medium === 'local' && this.localStorage) {
      this.localStorage.setItem(key, value);
    } else if (medium === 'session' && this.sessionStorage) {
      this.sessionStorage.setItem(key, value);
    }
  }

  // Remove a value in storage
  remove(medium: 'local' | 'session', key: string): void {
    key = `${environment.name}-${key}`;
    if (medium === 'local' && this.localStorage) {
      this.localStorage.removeItem(key);
    } else if (medium === 'session' && this.sessionStorage) {
      this.sessionStorage.removeItem(key);
    }
  }
}
