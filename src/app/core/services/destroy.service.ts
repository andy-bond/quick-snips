import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// SOURCE: Taiga UI - https://github.com/TinkoffCreditSystems/taiga-ui/blob/main/projects/cdk/services/destroy.service.ts
// NOTE: Only use this in Components or Directives (you must add the service to the component's providers array)
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
