import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PermissionModel } from '../Models/RoleModel.model';
import { ResponseModel, UserDialogInfoModel, UserModel, UserModelList } from '../Models/UserModel.model';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public objectUserTable: UserModelList;
  public formGroupSearchUser: FormGroup;

  public displayedColumns: string[] = ['number', 'userId', 'username', 'name', 'surname', 'roleName', 'date', 'log', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<UserModel>();
  public formGroup: FormGroup;
  public permissions: PermissionModel[];

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUser();
    this.permissions = JSON.parse(localStorage.getItem('permissions'));
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      isSearch: new FormControl(''),
    });
  }

  public getUserAll(): void {
    this.http.get(environment.apiUrl + '/User/UserAll').subscribe((userdata: UserModelList) => {
      this.objectUserTable = userdata;
      this.dataSource = new MatTableDataSource<UserModel>(this.objectUserTable.usertable);
      this.dataSource.paginator = this.paginator;
    });
  }

  public getUser(): void {
    const searchTxt = this.formGroup.value.isSearch;
    const url = environment.apiUrl + '/User/QueryUser?SearchText=' + searchTxt;
    this.http.get(url).subscribe((queryuser: UserModelList) => {
      this.objectUserTable = queryuser;
      this.dataSource = new MatTableDataSource<UserModel>(this.objectUserTable.usertable);
      this.dataSource.paginator = this.paginator;

    });
  }

  public click(): void {
    alert('click icon');
  }

  public clickEdit(id: number): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        UserId: id,
        Action: 'edit'
      }
    };
    this.router.navigate(['/user-profile'], navigationExtras);

  }

  public AddUser(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Action: 'add'
      }
    };
    this.router.navigate(['/user-profile'], navigationExtras);
  }

  /////////ตรงวนี้นะ/////////
  public clickDelete(id: number, user: string): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '500px',
      // data: new UserDialogInfoModel({ username: user, userId: id })
      // data: this.messageError
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      // if (result) {
      //   this.getUser();
      // }
    });

  }

  checkPermission(eventPermission: string): boolean {
    let result = false;
    if (this.permissions.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.permissions.length; i++) {

        if (this.permissions[i].permissionName === 'ViewButtonDeleteUser' && this.permissions[i].permissionCheck === false) {
          const index = this.displayedColumns.indexOf('delete');
          if (index >= 0) { this.displayedColumns.splice(index, 1); }
        }

        if (this.permissions[i].permissionName === 'ViewButtonEditUser' && this.permissions[i].permissionCheck === false) {
          const index = this.displayedColumns.indexOf('edit');
          if (index >= 0) { this.displayedColumns.splice(index, 1); }
        }

        if (this.permissions[i].permissionName === 'ViewButtonLogUser' && this.permissions[i].permissionCheck === false) {
          const index = this.displayedColumns.indexOf('log');
          if (index >= 0) { this.displayedColumns.splice(index, 1); }
        }

        if (this.permissions[i].permissionName === eventPermission) {
          result = this.permissions[i].permissionCheck;
          break;
        }

      }
    }
    return result;
  }
}
