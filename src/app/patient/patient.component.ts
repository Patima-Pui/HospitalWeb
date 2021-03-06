import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DropdownTypeModel, DropdownTypeModelList, PatientModel, PatientModelList } from '../Models/PatientModel.model';
import { PermissionModel } from '../Models/RoleModel.model';
import { PatientService } from '../service/patient.service';
import { PatientInfoDialogComponent } from './patient-info-dialog/patient-info-dialog.component';
import { saveAs } from 'file-saver';
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
  public dataSource = new MatTableDataSource<PatientModel>();

  public formGroup: FormGroup;
  public typeList: DropdownTypeModel[];

  public permissions: PermissionModel[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private patientService: PatientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // default data
    this.initForm();
    this.formGroup.controls.isType.setValue(-1);
    this.getPatient();
    this.getType();
    this.permissions = JSON.parse(localStorage.getItem('permissions'));
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
    const url = environment.apiUrl +  '/Patient/QueryPatient?SearchText=' + searchTxt + '&TypeId=' + typeId;
    this.http.get(url).subscribe((maindata: PatientModelList) => {

      this.ObjectTable = maindata;
      this.dataSource = new MatTableDataSource<PatientModel>(this.ObjectTable.patienttable);
      this.dataSource.paginator = this.paginator;

    });
  }

  public getType(): void {
    this.http.get(environment.apiUrl + '/Patient/DropdownType').subscribe((data: DropdownTypeModelList) => {
      if (data) {
        // fruits.splice(0, 0, "Lemon");
        const defaultTypeALL = new DropdownTypeModel({ id: -1, name: 'ALL'});
        this.typeList = data.typeList;
        this.typeList.splice(0, 0, defaultTypeALL);
      }
    });
  }

  public gotoPatientInfo(id: number): void {
    const dialogRef = this.dialog.open(PatientInfoDialogComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed();

    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     Hn: id,
    //   }
    // };
    // this.router.navigate(['/patients/patient-info'], navigationExtras);
  }

  checkPermission(eventPermission: string): boolean {
    let result = false;
    if (this.permissions.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].permissionName === eventPermission) {
          result = this.permissions[i].permissionCheck;
          break;
        }
      }
    }
    return result;
  }

  exportPatient(): void {
    const searchTxt = this.formGroup.value.isSearch;
    const typeId = this.formGroup.value.isType;
    this.patientService.getExportPatient(searchTxt, typeId).subscribe(res => {
      const blob = new Blob([res], { type: 'application/octet-stream' });
      saveAs(blob, 'Patient.xlsx');
    });
  }
}
