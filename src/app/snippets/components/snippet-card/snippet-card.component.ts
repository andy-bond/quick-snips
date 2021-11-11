import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafePipeModule } from '@shared/pipes';
import { Snippet } from '@snippets/models';

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html',
  styleUrls: ['./snippet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetCardComponent {
  @Input() snippet!: Snippet;
  @HostBinding('class') hostClass = 'flex flex-col gap-1 p-1';
  @HostBinding('attr.tabIndex') tabIndex = 0;
  @Output() pinClicked = new EventEmitter<void>();
  @Output() removeClicked = new EventEmitter<void>();
  @Output() tagClicked = new EventEmitter<string>();
  @Output() copyClicked = new EventEmitter<void>();

  remove(event: Event) {
    event.stopPropagation();

    this.removeClicked.emit();
  }

  pin(event: Event) {
    event.stopPropagation();

    this.pinClicked.emit();
  }

  tagged(event: Event, tag: string) {
    event.stopPropagation();

    this.tagClicked.emit(`#${tag}`);
  }

  copy(event: Event) {
    event.stopPropagation();

    this.copyClicked.emit();
  }
}

@NgModule({
  declarations: [SnippetCardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    SafePipeModule,
  ],
  exports: [SnippetCardComponent],
})
export class SnippetCardComponentModule {}
