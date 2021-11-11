import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  @HostBinding('class') hostClass = 'flex flex-row align-items-center px-1';
  dev = !environment.production;
  version: string = environment.version;

  constructor() {}
}
