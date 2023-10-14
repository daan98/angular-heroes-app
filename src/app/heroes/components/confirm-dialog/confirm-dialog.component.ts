import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HeroInteraface } from '../../interfaces';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {
  
  constructor(
    private dialogRef : MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : HeroInteraface
  ) {}

  public onClickConfirm() : void {
    this.dialogRef.close(true);
  }

  public onClickCancel() : void {
    this.dialogRef.close(false);
  }

}
