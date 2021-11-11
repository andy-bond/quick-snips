import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BaseState } from './base-state';

// SOURCE: https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g
export class Store<T extends BaseState> {
  private state$: BehaviorSubject<T>;

  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initial: T) {
    this.state$ = new BehaviorSubject<T>(initial);
  }

  protected select<K>(mapper: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapper(state)),
      distinctUntilChanged()
    );
  }

  protected set(next: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...next,
    });
  }

  protected loading(value: boolean) {
    this.set({ loading: value } as Partial<T>);
  }

  protected error(value: string | string[]) {
    this.set({ error: value } as Partial<T>);
  }
}
