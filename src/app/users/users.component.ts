import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
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

  public displayedColumns: string[] = ['userId', 'username', 'name', 'surname', 'date', 'log', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<UserModel>();
  public formGroup: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.initForm();
    this.getUser();
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      isSearch: new FormControl(''),
    });
  }

  public getUserAll(): void {
    this.http.get('http://localhost:5015/User/UserAll').subscribe((userdata: UserModelList) => {
      this.objectUserTable = userdata;
      this.dataSource = new MatTableDataSource<UserModel>(this.objectUserTable.usertable);
      this.dataSource.paginator = this.paginator;
    });
  }

  public getUser(): void {
    const searchTxt = this.formGroup.value.isSearch;
    const url = 'http://localhost:5015/User/QueryUser?SearchText=' + searchTxt;
    this.http.get(url).subscribe((queryuser: UserModelList) => {
      this.objectUserTable = queryuser;
      this.dataSource = new MatTableDataSource<UserModel>(this.objectUserTable.usertable);
      this.dataSource.paginator = this.paginator;
      // console.log('User feedback: ', this.objectUserTable);

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

  public clickDelete(id: number, user: string): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '500px',
      data: new UserDialogInfoModel({ username: user, userId: id })
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.getUser();
      }
    });

  }
}
