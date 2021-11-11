import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { HelpEntry } from '@help/models';
import { randomString } from '@core/helpers';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  private cache: HelpEntry[] = [];
  private unknown: HelpEntry = {
    key: 'unknown',
    title: 'Unknown',
    description: `Whoops - This help text hasn't been created yet.`,
  };

  constructor(private http: HttpClient) {}

  get(key: string): Observable<HelpEntry> {
    if (this.cache.length === 0) {
      return this.http
        .get<HelpEntry[]>(`assets/content/help.json?v=${randomString()}`)
        .pipe(
          first(),
          tap((entries) => (this.cache = entries)),
          map(() => this.retrieve(key))
        );
    } else {
      return of(this.retrieve(key));
    }
  }

  private retrieve(key: string): HelpEntry {
    return this.cache.find((i) => i.key === key) ?? this.unknown;
  }
}
