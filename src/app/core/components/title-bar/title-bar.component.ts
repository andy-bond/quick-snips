import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ThemeStore } from '@core/stores';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBarComponent {
  @HostBinding('class') hostClass =
    'flex flex-row align-items-center relative mat-elevation-z6';
  @HostBinding('style.z-index') zIndex = '100';
  @Input() appTitle = '';

  constructor(public theme: ThemeStore) {}
}
