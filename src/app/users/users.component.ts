import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { ResponseModel, UserModel, UserModelList } from '../Models/UserModel.model';

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
  // public dataSource: UserModel[];
  public dataSource = new MatTableDataSource<UserModel>();
  public formGroup: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.getUserAll();
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
      // console.log('User Information from backend: ', this.objectUserTable);
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

  public clickDelete(id: number): void {
    const url = 'http://localhost:5015/User/DeleteProfile/' + id;
    this.http.delete(url).subscribe(response => {
      console.log(response);
      this.router.navigate(['/users']);
    },
      error => {
        console.log(error);
      });
  }
}
