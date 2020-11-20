import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TestModel, TestModelList } from '../Models/UserModel.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public objectTable: TestModelList;
  public formGroupNaja: FormGroup;

  public displayedColumns: string[] = ['userId', 'username', 'name', 'surname', 'date', 'log'];
  public dataSource: TestModel[];

  constructor(
    private http: HttpClient
  ) { }

  public getData(): void {
    this.http.get('http://localhost:5015/UserInfo/GetList').subscribe((data: TestModelList) => {

      this.objectTable = data;
      this.dataSource = this.objectTable.datatable;

      console.log('Information from backend: ', this.objectTable);

    });
  }

  public ngOnInit(): void {
    this.formGroupNaja = new FormGroup({
      isName: new FormControl('ปุ้ย'),
      isSurname: new FormControl('kung'),
      isUsername: new FormControl('puikung')
    });

    this.getData();
  }

  public click(): void {
    alert('click log file');
  }

}
