import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '@help/components';

@Directive({
  selector: '[appHelp]',
})
export class HelpDirective {
  @Input('appHelp') key: string | undefined;

  @HostListener('click', ['$event']) click(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(HelpDialogComponent, {
      width: 'auto',
      height: 'auto',
      minHeight: '150px',
      minWidth: '350px',
      maxHeight: '50vh',
      maxWidth: '500px',
      data: this.key,
      panelClass: 'custom-dialog',
    });
  }

  constructor(private dialog: MatDialog) {}
}
