import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@ng-web-apis/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StorageService } from '@core/services';
import { BaseState, Store } from '@core/models';

const STORAGE_KEY = 'theme';
const THEME_DARK = 'theme-dark';
const THEME_LIGHT = 'theme-light';

interface ThemeState extends BaseState {
  theme: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeStore extends Store<ThemeState> {
  private target!: HTMLElement;

  dark$: Observable<boolean> = this.select((state) => state.theme).pipe(
    map((theme) => theme === THEME_DARK),
    shareReplay(1)
  );

  constructor(
    @Inject(WINDOW) window: Window,
    @Inject(DOCUMENT) document: Document,
    private storage: StorageService
  ) {
    super({
      loading: false,
      error: '',
      theme: storage.get('local', STORAGE_KEY)
        ? storage.get('local', STORAGE_KEY)!
        : window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME_DARK
        : THEME_LIGHT,
    });

    this.target = document.documentElement;
  }

  toggle() {
    const current = this.state.theme;
    const next = current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    this.set({ theme: next });
    this.storage.set('local', STORAGE_KEY, next);
    this.target.classList.remove(current);
    this.target.classList.add(next);
  }
}
