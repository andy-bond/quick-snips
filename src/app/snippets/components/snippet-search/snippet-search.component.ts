import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  NgModule,
  HostBinding,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DestroyService } from '@core/services';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-snippet-search',
  templateUrl: './snippet-search.component.html',
  styleUrls: ['./snippet-search.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetSearchComponent implements OnInit {
  @HostBinding('class') hostClass = 'flex flex-row align-items-center';
  @Output() search = new EventEmitter<string>();
  @ViewChild('input') input!: ElementRef;
  @HostListener('window:keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
      this.input?.nativeElement?.focus();
    }
  }

  searchControl = new FormControl('');

  constructor(private destroy$: DestroyService) {}

  ngOnInit() {
    this.searchControl?.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(250))
      .subscribe((value) => {
        this.search.emit(value.toLowerCase().trim());
      });
  }
}

@NgModule({
  declarations: [SnippetSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [SnippetSearchComponent],
})
export class SnippetSearchComponentModule {}
