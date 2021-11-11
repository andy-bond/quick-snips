import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
  HostBinding,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  SnippetCardComponentModule,
  SnippetDialogComponent,
  SnippetSearchComponentModule,
} from '@snippets/components';
import { SnippetsStore } from '@snippets/stores';
import { NgLetDirectiveModule } from '@shared/directives';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Snippet } from '@snippets/models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { cardAnimation, DEFAULT_DIALOG_CONFIG } from '@core/helpers';
import { MatChipsModule } from '@angular/material/chips';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DestroyService } from '@core/services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';
import {
  MatDrawerMode,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-snippets-selection',
  templateUrl: './snippets-selection.component.html',
  styleUrls: ['./snippets-selection.component.scss'],
  providers: [DestroyService],
  animations: [cardAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsSelectionComponent implements AfterViewInit {
  @ViewChild(MatSidenav) private sidenav!: MatSidenav;
  @HostBinding('class') hostClass = 'h-full flex flex-col align-items-center';
  @HostListener('window:keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.ctrlKey && e.shiftKey && e.key === ' ') {
      if (this.dialog.openDialogs?.length <= 0) {
        this.open();
      }
    }
  }

  opened!: boolean;
  mode!: MatDrawerMode;

  constructor(
    public snippetsStore: SnippetsStore,
    private destroy$: DestroyService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    private breakpoint: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.breakpoint
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(debounceTime(250), takeUntil(this.destroy$))
      .subscribe((state) => {
        this.opened = !state.matches && !(this.opened === true);
        this.mode = state.matches ? 'over' : 'side';
        this.changeDetectorRef.markForCheck();
      });
  }

  public toggle(): void {
    this.sidenav.toggle();
    this.changeDetectorRef.markForCheck();
  }

  open(snippet?: Snippet) {
    this.dialog.open(SnippetDialogComponent, {
      ...DEFAULT_DIALOG_CONFIG,
      data: snippet,
    });
  }

  pin(snippet: Snippet) {
    this.snippetsStore.update({
      ...snippet,
      pinned: !snippet.pinned,
    });
  }

  remove(snippet: Snippet) {
    this.snippetsStore.delete(snippet);

    const snackbarRef = this.snackbar.open(`Snippet Removed`, 'UNDO', {
      duration: 5000,
      panelClass: 'snackbar-warning',
    });

    snackbarRef
      .onAction()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.snippetsStore.add(snippet);

        this.snackbar.open(`Snippet Restored`, 'OK', {
          duration: 5000,
          panelClass: 'snackbar-success',
        });
      });
  }

  copy(snippet: Snippet) {
    this.clipboard.copy(snippet.body);

    this.snackbar.open(`Snippet Copied`, 'OK', {
      duration: 5000,
      panelClass: 'snackbar-success',
    });
  }

  showTags() {}

  identify(_index: number, snippet: Snippet) {
    return snippet.id;
  }
}

@NgModule({
  declarations: [SnippetsSelectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: SnippetsSelectionComponent },
    ]),
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    ClipboardModule,
    NgLetDirectiveModule,
    SnippetSearchComponentModule,
    SnippetCardComponentModule,
  ],
  exports: [SnippetsSelectionComponent],
})
export class SnippetsSelectionComponentModule {}
