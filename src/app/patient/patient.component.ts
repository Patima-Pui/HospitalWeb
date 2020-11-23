import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { DropdownTypeModel, DropdownTypeModelList, PatientModel, PatientModelList } from '../Models/PatientModel.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})

export class PatientComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Create Patient Object Table
  public ObjectTable: PatientModelList;
  public DropdownType: DropdownTypeModelList;

  // Create Column Table
  public displayedColumns: string[] = ['number', 'HN', 'name', 'surname', 'age', 'birthday', 'type', 'visit', 'account'];
  // public dataSource: PatientModel[];
  public dataSource = new MatTableDataSource<PatientModel>();

  public formGroup: FormGroup;
  public typeList: DropdownTypeModel[];
  /*= [
    new DropdownTypeModel({ id: -1, name: 'All' }),
    new DropdownTypeModel({ id: 0, name: 'Normal' }),
    new DropdownTypeModel({ id: 1, name: 'VIP' }),
    new DropdownTypeModel({ id: 2, name: 'Blacklist' })
  ]*/

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // default data
    this.initForm();
    this.formGroup.controls.isType.setValue(-1);

    this.getPatient();
    this.getType();
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      isSearch: new FormControl(''),
      isType: new FormControl('')
    });

  }

  public getPatient(): void {
    const searchTxt = this.formGroup.value.isSearch;
    const typeId = this.formGroup.value.isType;
    const url = 'http://localhost:5015/Patient/QueryPatient?SearchText=' + searchTxt + '&TypeId=' + typeId;
    this.http.get(url).subscribe((maindata: PatientModelList) => {

      this.ObjectTable = maindata;
      this.dataSource = new MatTableDataSource<PatientModel>(this.ObjectTable.patienttable);
      this.dataSource.paginator = this.paginator;
      console.log('Patient Information from backend: ', this.ObjectTable);

    });
  }

  public getType(): void {
    this.http.get('http://localhost:5015/Patient/DropdownType').subscribe((data: DropdownTypeModelList) => {
      if (data) {
        this.typeList = data.typeList;
        console.log('Type from backend: ', this.typeList);
      }
    });
  }

  public gotoPatientInfo(id: number): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Hn: id,
      }
    };
    this.router.navigate(['/patients/patient-info'], navigationExtras);
  }
}
