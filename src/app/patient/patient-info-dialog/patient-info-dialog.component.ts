import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from 'src/app/Models/PatientModel.model';

@Component({
  selector: 'app-patient-info-dialog',
  templateUrl: './patient-info-dialog.component.html',
  styleUrls: ['./patient-info-dialog.component.css']
})

export class PatientInfoDialogComponent implements OnInit {

  public patientId: number;
  public patientInfo: PatientModel = new PatientModel();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialogRef: MatDialogRef<PatientInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void {
    this.getPatientInfoById();
  }

  getPatientInfoById(): void {
    const url = 'http://localhost:5015/Patient/PatientInfo?Id=' + this.data ;
    this.http.get(url).subscribe((data: PatientModel) => {
      this.patientInfo = data;
      console.log('PatientId response:', data);
    },
    error => {
      console.log(error);
    });
  }
}
