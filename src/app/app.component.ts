import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { environment } from '@environments/environment';
import { IconService } from '@core/services';
import { ICONS } from '@core/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class') hostClass = 'flex flex-col h-full';
  title = environment.name.replace('-', ' ').toUpperCase();
  constructor(icons: IconService) {
    icons.register(ICONS);
  }
}
