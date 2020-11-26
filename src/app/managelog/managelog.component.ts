import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TestModel, TestModelList, UserModel, UserModelList } from '../Models/UserModel.model';

@Component({
  selector: 'app-managelog',
  templateUrl: './managelog.component.html',
  styleUrls: ['./managelog.component.css']
})
export class ManagelogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public objectTable: UserModelList;
  public displayedColumns: string[] = ['userId', 'username', 'name', 'surname', 'date'];
  public dataSource = new MatTableDataSource<UserModel>();
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.http.get('http://localhost:5015/User/UserAll').subscribe((data: UserModelList) => {

      this.objectTable = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.objectTable.usertable);
      this.dataSource.paginator = this.paginator;
      console.log('Information from backend: ', this.objectTable);

    });
  }
}
