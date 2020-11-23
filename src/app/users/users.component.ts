import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserModel, UserModelList } from '../Models/UserModel.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public objectUserTable: UserModelList;
  public formGroupSearchUser: FormGroup;

  public displayedColumns: string[] = ['userId', 'username', 'name', 'surname', 'date', 'log', 'edit', 'delete'];
  public dataSource: UserModel[];

  public formGroup: FormGroup;

  constructor(
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
    this.http.get('http://localhost:5015/User/UserInfo').subscribe((userdata: UserModelList ) => {

      this.objectUserTable = userdata;
      this.dataSource = this.objectUserTable.usertable;

      console.log('User Information from backend: ', this.objectUserTable);

    });
  }

  public getUser(): void {
    const searchTxt = this.formGroup.value.isSearch;
    const url = 'http://localhost:5015/User/QueryUser?SearchText=' + searchTxt;
    this.http.get(url).subscribe((queryuser: UserModelList) => {

      this.objectUserTable = queryuser;
      this.dataSource = this.objectUserTable.usertable;

      console.log('User feedback: ', this.objectUserTable);

    });
  }

  public click(): void {
    alert('click icon');
  }

}
