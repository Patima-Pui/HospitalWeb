import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownDepartmentModel, RequestRegister, ResponseModel } from '../Models/UserModel.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public isUsername: string;
  public isPassword: string;
  public isRePassword: string;
  public isName: string;
  public isSurname: string;
  public isTelephone: string;
  public isEmail: string;
  public isDepartmentId: number;
  public formGroup: FormGroup;
  public departmentList: DropdownDepartmentModel[] = [
    new DropdownDepartmentModel({ id: 0, name: 'OUTPATIENT'}),
    new DropdownDepartmentModel({ id: 1, name: 'INPATIENT'}),
    new DropdownDepartmentModel({ id: 2, name: 'EMERGENCY'}),
    new DropdownDepartmentModel({ id: 3, name: 'IT'})];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      isUsername: new FormControl(''),
      isPassword: new FormControl(''),
      isRePassword: new FormControl(''),
      isName: new FormControl(''),
      isSurname: new FormControl(''),
      isTelephone: new FormControl(''),
      isEmail: new FormControl(''),
      isDepartmentId: new FormControl('')
    });
  }

  clickRegister(): void {
    const formbody = new RequestRegister({
      Username: this.formGroup.value.isUsername,
      Password: this.formGroup.value.isPassword,
      Name: this.formGroup.value.isName,
      Surname: this.formGroup.value.isSurname,
      Telephone: this.formGroup.value.isTelephone,
      Email: this.formGroup.value.isEmail,
      DepartmentId: Number(this.formGroup.value.isDepartmentId)
    });

    this.http.post('http://localhost:5015/User/Register', formbody).subscribe(
      // เมื่อAPI Response กลับมาแล้วจะทำงานภายใต้ปีกกกา
      (response: ResponseModel) => {

        if (response.success) {
          alert('REGISTER SUCCESS');
          this.router.navigate(['/login']);
        } else {
          alert('REGISTER FAIL !');
        }

      },
      (error) => {
        console.log(error);
        alert('REGISTER FAIL !!!');
      }
    );
  }

  clickCancel(): void {
    this.router.navigate(['/login']);
  }
}
