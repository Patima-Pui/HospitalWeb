import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientModel } from '../Models/PatientModel.model';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  public patientId: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getExtras();
  }

  getExtras(): void {
    this.route.queryParams.subscribe((param) => {
      if (param) {
        this.patientId = param.Hn;
        console.log('HAHAA=> ', this.patientId);
      }
    });
  }

}
