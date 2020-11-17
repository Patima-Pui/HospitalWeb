import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownTypeModelList, PatientModel, PatientModelList } from '../Models/PatientModel.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  // Create Patient Object Table
  public ObjectTable: PatientModelList;
  public DropdownType: DropdownTypeModelList;
  // Create Column Table
  public displayedColumns: string[] = ['number', 'HN', 'name', 'surname', 'age', 'birthday', 'type', 'visit', 'account'];
  public dataSource: PatientModel[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPatient();
    this.getType();
  }

  public getPatient(): void {
    this.http.get('http://localhost:5000/UserInfo/GetList').subscribe((data: PatientModelList ) => {

      this.ObjectTable = data;
      this.dataSource = this.ObjectTable.datatable;

      console.log('Patient Information from backend: ', this.ObjectTable);

    });
  }

  public getType(): void {
    this.http.get('http://localhost:5000/UserInfo/GetList').subscribe((data: DropdownTypeModelList ) => {

      this.DropdownType = data;
      // this.dataSource = this.DropdownType.typelist;

      console.log('Type from backend: ', this.DropdownType);

    });
  }
}
