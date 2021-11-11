import { Injectable, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  delay,
  filter,
  map,
  repeatWhen,
  shareReplay,
  takeUntil,
} from 'rxjs/operators';
import { BaseState, Store } from '@core/models';
import { NewSnippet, Snippet } from '@snippets/models';
import { StorageService } from '@core/services';

interface SnippetsState extends BaseState {
  snippets: Snippet[] | undefined;
  search: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnippetsStore extends Store<SnippetsState> implements OnDestroy {
  private destroy$ = new Subject<void>();
  private snippetsKey = 'snippets';

  snippets$: Observable<Snippet[] | undefined> = this.select(
    (state) => state.snippets
  ).pipe(
    map((snippets) =>
      snippets?.sort(
        (a, b) =>
          Number(b?.pinned) - Number(a?.pinned) ||
          a?.title?.toLowerCase().localeCompare(b?.title?.toLowerCase())
      )
    ),
    shareReplay(1)
  );

  search$: Observable<string> = this.select((state) => state.search).pipe(
    shareReplay(1)
  );

  filteredSnippets$ = combineLatest([this.snippets$, this.search$]).pipe(
    map(([snippets, search]) => {
      const searchValue = search.toLowerCase().trim();
      const tagSearch = searchValue.startsWith('#');
      const searchTerm = tagSearch ? searchValue.substring(1) : searchValue;
      return snippets?.filter((i) =>
        tagSearch
          ? i?.tags?.some((i) => i.includes(searchTerm))
          : i?.title?.toLowerCase()?.includes(searchTerm) ||
            i?.body?.toLowerCase()?.includes(searchTerm)
      );
    }),
    shareReplay(1)
  );

  tags$: Observable<string[]> = this.select(
    (state) =>
      state.snippets
        ?.map((i) => i.tags)
        ?.reduce((acc, curr) => {
          curr.forEach((i) => {
            if (!acc.includes(i)) {
              acc.push(i);
            }
          });
          return acc;
        }, [])
        ?.sort() ?? []
  );

  loading$: Observable<boolean> = this.select((state) => state.loading).pipe(
    shareReplay(1)
  );

  constructor(private storage: StorageService) {
    super({
      loading: true,
      error: '',
      snippets: undefined,
      search: '',
    });

    this.fetch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  add(newSnippet: NewSnippet) {
    const currentSnippets = this.getSnippets();

    const id = Math.max(...currentSnippets.map((v) => v.id), 0) + 1;
    const snippetWithId: Snippet = {
      id,
      ...newSnippet,
    };

    currentSnippets.push(snippetWithId);

    this.saveSnippets(currentSnippets);
  }

  update(snippet: Snippet) {
    const currentSnippets = this.getSnippets();

    const index = currentSnippets.findIndex((i) => i.id === snippet.id);
    if (index !== -1 && currentSnippets[index] !== snippet) {
      currentSnippets.splice(index, 1, snippet);
      this.saveSnippets(currentSnippets);
    }
  }

  delete(snippet: Snippet) {
    const currentSnippets = this.getSnippets();

    const index = currentSnippets.findIndex((i) => i.id === snippet.id);
    if (index !== -1) {
      currentSnippets.splice(index, 1);
      this.saveSnippets(currentSnippets);
    }
  }

  search(search: string) {
    this.set({ search });
  }

  private fetch() {
    this.loading(true);

    let snippets = this.getSnippets();

    this.set({
      snippets,
      loading: false,
    });
  }

  private getSnippets() {
    let snippets: Snippet[] = [];

    const retrieved = this.storage.get('local', this.snippetsKey);

    if (retrieved) {
      snippets = JSON.parse(retrieved);
    }

    return snippets;
  }

  private saveSnippets(snippets: Snippet[]) {
    this.loading(true);
    this.storage.set('local', this.snippetsKey, JSON.stringify(snippets));
    this.fetch();
  }
}
