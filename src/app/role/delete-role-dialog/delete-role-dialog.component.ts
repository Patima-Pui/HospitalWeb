import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/Models/RoleModel.model';

@Component({
  selector: 'app-delete-role-dialog',
  templateUrl: './delete-role-dialog.component.html',
  styleUrls: ['./delete-role-dialog.component.css']
})
export class DeleteRoleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel) { }

  onClickCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {}

  ngOnInit(): void {
  }

}
