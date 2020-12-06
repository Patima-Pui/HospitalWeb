import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Global } from 'src/app/global/global';
import { ResponseModel, UserDialogInfoModel } from 'src/app/Models/UserModel.model';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent {

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogInfoModel) { }

  onClickCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: this.data.userId,
        username: this.data.username,
        deleteName: Global._USERNAME
      }
    };
    const url = 'http://localhost:5015/User/DeleteProfile';
    this.http.delete(url, options).subscribe(
      (response: ResponseModel) => {
        console.log(response);
        if (response.success) {
          this.dialogRef.close(true);
        }
      },
      error => {
        console.log(error);
      });

  }


}
