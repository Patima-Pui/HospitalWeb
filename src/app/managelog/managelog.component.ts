import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LogModel, LogModelList } from '../Models/LogModel.model';

@Component({
  selector: 'app-managelog',
  templateUrl: './managelog.component.html',
  styleUrls: ['./managelog.component.css']
})
export class ManagelogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public objectTable: LogModelList;
  public displayedColumns: string[] = ['number', 'name', 'target', 'action',  'date'];
  public dataSource = new MatTableDataSource<LogModel>();
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    // ?Action=Edit&TargetName=aaaaa&CreateName=Pui&StartDate=2020-12-01&EndDate=2020-12-14
    const parameter = '?Action=Edit&TargetName=aaaaa&CreateName=Pui&StartDate=2020-12-01&EndDate=2020-12-14';
    this.http.get('http://localhost:5015/Log/SelectLog' + parameter).subscribe((data: LogModelList) => {

      this.objectTable = data;
      this.dataSource = new MatTableDataSource<LogModel>(this.objectTable.logtable);
      this.dataSource.paginator = this.paginator;
      console.log('Information from backend: ', this.objectTable);

    });
  }
}
