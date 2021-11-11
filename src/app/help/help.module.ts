import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { HelpButtonComponent, HelpDialogComponent } from './components';
import { HelpDirective } from './directives';

@NgModule({
  declarations: [HelpDialogComponent, HelpButtonComponent, HelpDirective],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  exports: [HelpButtonComponent, HelpDirective],
})
export class HelpModule {}
