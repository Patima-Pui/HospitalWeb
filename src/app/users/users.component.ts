import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserModel, UserModelList } from '../Models/UserModel.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public objectUserTable: UserModelList;
  public formGroupSearchUser: FormGroup;

  public displayedColumns: string[] = ['userId', 'username', 'name', 'surname', 'date', 'log', 'edit'];
  public dataSource: UserModel[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUser();

  }

  public getUser(): void {
    this.http.get('http://localhost:5015/User/UserInfo').subscribe((userdata: UserModelList ) => {

      this.objectUserTable = userdata;
      this.dataSource = this.objectUserTable.usertable;

      console.log('User Information from backend: ', this.objectUserTable);

    });
  }

  public click(): void {
    alert('click icon');
  }

}
