import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HelpService } from '@help/services';
import { HelpEntry } from '@help/models';

@Component({
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpDialogComponent implements OnInit {
  @HostBinding('class') hostClass = 'flex flex-col';
  entry$!: Observable<HelpEntry>;

  constructor(
    private help: HelpService,
    private dialogRef: MatDialogRef<HelpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private key: string
  ) {}

  ngOnInit(): void {
    this.entry$ = this.help.get(this.key);
  }

  close(): void {
    this.dialogRef.close();
  }
}
