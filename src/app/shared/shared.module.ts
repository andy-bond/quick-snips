import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO: Remove unnecessary imports
// NOTE: Think carefully whether a module should *really* be imported in all feature modules
// NOTE: You can make multiple 'shared' modules - consider a 'form-utilities' module that is only imported in feature modules using forms
// NOTE: The 'HelpModule' is an example of 'shared' module - it will likely be used in multiple places
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ConfirmDialogComponent } from './components';

@NgModule({
  declarations: [
    // components
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  exports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    // components
    ConfirmDialogComponent,
  ],
})
export class SharedModule {}
