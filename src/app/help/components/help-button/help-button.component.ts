import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpButtonComponent {
  @HostBinding('class') hostClass =
    'flex flex-col align-items-center justify-content-center';
  @Input() key: string | undefined;
}
