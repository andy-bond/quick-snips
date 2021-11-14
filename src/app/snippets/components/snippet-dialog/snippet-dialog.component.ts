import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
  Inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Snippet } from '@snippets/models';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SnippetsStore } from '@snippets/stores';
import { DestroyService } from '@core/services';
import { takeUntil } from 'rxjs/operators';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  templateUrl: './snippet-dialog.component.html',
  styleUrls: ['./snippet-dialog.component.scss'],
  providers: [DestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetDialogComponent implements OnInit {
  edit = false;
  form: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private snippetsStore: SnippetsStore,
    private destroy$: DestroyService,
    private dialogRef: MatDialogRef<SnippetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public snippet?: Snippet
  ) {
    this.edit = !!this.snippet;
    this.form = new FormGroup({
      title: new FormControl(this.snippet?.title ?? undefined),
      body: new FormControl(this.snippet?.body ?? ''),
      tags: new FormControl(this.snippet?.tags ?? []),
    });
  }

  get tags() {
    return this.form.get('tags');
  }

  ngOnInit() {
    this.dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const titleValue = this.form.get('title')?.value?.trim();
        const bodyValue = this.form.get('body')?.value?.trim();
        const tagsValue = this.tags?.value;
        if (this.edit && this.snippet) {
          this.snippetsStore.update({
            id: this.snippet.id,
            title: titleValue,
            body: bodyValue,
            pinned: this.snippet.pinned,
            tags: tagsValue,
          });
        } else {
          if (titleValue || bodyValue || tagsValue?.length > 0) {
            this.snippetsStore.add({
              title: titleValue ?? 'Untitled Snippet',
              body: bodyValue,
              pinned: false,
              tags: tagsValue,
            });
          }
        }
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.chipInput?.inputElement;
    let tag = event.value?.toLowerCase().trim();
    tag = tag.startsWith('#') ? tag.substring(1) : tag;
    const index = this.tags?.value.indexOf(tag);

    // Add Tag
    if (tag !== '' && index === -1) {
      this.tags?.setValue([...this.tags.value, tag]);
      this.tags?.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
      input.focus();
    }
  }

  remove(tag: string): void {
    const index = this.tags?.value.indexOf(tag);

    if (index >= 0) {
      this.tags?.value.splice(index, 1);
      this.tags?.updateValueAndValidity();
    }
  }

  confirm(): void {
    if (this.edit && this.snippet) {
      this.snippetsStore.update({
        id: this.snippet.id,
        title: this.form.get('title')?.value?.trim(),
        body: this.form.get('body')?.value?.trim(),
        pinned: this.snippet.pinned,
        tags: this.tags?.value,
      });
    } else {
      this.snippetsStore.add({
        title: this.form.get('title')?.value?.trim(),
        body: this.form.get('body')?.value?.trim(),
        pinned: false,
        tags: this.tags?.value,
      });
    }

    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [SnippetDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    TextFieldModule,
    MatChipsModule,
  ],
  exports: [SnippetDialogComponent],
})
export class SnippetDialogComponentModule {}
