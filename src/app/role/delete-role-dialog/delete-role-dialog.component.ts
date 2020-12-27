import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModel } from 'src/app/Models/RoleModel.model';
import { ResponseModel } from 'src/app/Models/UserModel.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-role-dialog',
  templateUrl: './delete-role-dialog.component.html',
  styleUrls: ['./delete-role-dialog.component.css']
})
export class DeleteRoleDialogComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoleModel) { }

  onClickCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.http.delete(environment.apiUrl + '/Roles/DeleteRole?roleId=' + this.data.id).subscribe((res: ResponseModel) => {
      if (res.success) {
        this.dialogRef.close(true);
      }
    });
  }

  ngOnInit(): void {
  }

}
