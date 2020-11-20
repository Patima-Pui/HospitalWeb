import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DropdownTypeModel, DropdownTypeModelList, PatientModel, PatientModelList } from '../Models/PatientModel.model';

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
  public typeId: DropdownTypeModel[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getPatient();
    // this.getType();
  }

  public getPatient(): void {
    this.http.get('http://localhost:5015/Patient/PatientInfo').subscribe((maindata: PatientModelList ) => {

      this.ObjectTable = maindata;
      this.dataSource = this.ObjectTable.patienttable;

      console.log('Patient Information from backend: ', this.ObjectTable);

    });
  }

  public getType(): void {
    this.http.get('#').subscribe((typedata: DropdownTypeModelList ) => {

      this.DropdownType = typedata;
      this.typeId = this.DropdownType.typelist;

      console.log('Type from backend: ', this.DropdownType);

    });
  }

  public click(): void {
    alert('click icon');
  }

}
