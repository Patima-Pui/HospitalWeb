import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PatientModel } from '../Models/PatientModel.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  public patientId: number;
  public patientInfo: PatientModel = new PatientModel();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getExtras();
  }

  getExtras(): void {
    this.route.queryParams.subscribe((param) => {
      if (param) {
        this.patientId = param.Hn;
        // console.log('patientId=> ', this.patientId);
        this.getPatientInfoById();
      }
    });
  }

  getPatientInfoById(): void {
    const url = environment.apiUrl + '/Patient/PatientInfo?Id=' + this.patientId ;
    this.http.get(url).subscribe((data: PatientModel) => {
      this.patientInfo = data;
      // console.log('PatientId response:', data);
    });
  }
}
