import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../global/global';
import { DropdownDepartmentModel, DropdownDepartmentModelList, RequestRegister, ResponseModel, UserProfileModel } from '../Models/UserModel.model';

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
  public departmentList: DropdownDepartmentModel[];
  public action: string; // register, add, edit
  public userId: number;
  public duplicatePassword = true;

  constructor(
    private router: Router, // transmit
    private route: ActivatedRoute, // receive
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.action = 'register';
    this.initForm();
    this.getDepartmentList();
    this.getExtras();
  }

  getExtras(): void {
    this.route.queryParams.subscribe((param) => {
      if (param.Action !== undefined) {
        this.action = param.Action;
        this.userId = Number(param.UserId);
        if (this.action === 'edit') {
          this.getUserInfoById(this.userId);
        }
      }
    });
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
    if (!this.duplicatePassword) {
      alert('Please check invalid data.');
      return;
    }

    const formbody = new RequestRegister({
      Username: this.formGroup.value.isUsername,
      Password: this.formGroup.value.isPassword,
      Name: this.formGroup.value.isName,
      Surname: this.formGroup.value.isSurname,
      Telephone: this.formGroup.value.isTelephone,
      Email: this.formGroup.value.isEmail,
      DepartmentId: Number(this.formGroup.value.isDepartmentId),
      UpSertName: this.formGroup.value.isUsername
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

  clickSaveEdit(): void {
    const formbody = new RequestRegister({
      Id: this.userId,
      Username: this.formGroup.value.isUsername,
      Name: this.formGroup.value.isName,
      Surname: this.formGroup.value.isSurname,
      Telephone: this.formGroup.value.isTelephone,
      Email: this.formGroup.value.isEmail,
      DepartmentId: Number(this.formGroup.value.isDepartmentId),
      UpSertName: Global._USERNAME
    });

    this.http.put('http://localhost:5015/User/UpdateUserProfile', formbody).subscribe(
      // เมื่อAPI Response กลับมาแล้วจะทำงานภายใต้ปีกกกา
      (response: ResponseModel) => {

        if (response.success) {
          alert('UPDATE SUCCESS');
          this.router.navigate(['/users']);
        } else {
          alert('UPDATE FAIL !');
        }
      },
      (error) => {
        console.log(error);
        alert('UPDATE FAIL !!!');
      }
    );
  }

  clickAdd(): void {
    const formbody = new RequestRegister({
      Username: this.formGroup.value.isUsername,
      Password: this.formGroup.value.isPassword,
      Name: this.formGroup.value.isName,
      Surname: this.formGroup.value.isSurname,
      Telephone: this.formGroup.value.isTelephone,
      Email: this.formGroup.value.isEmail,
      DepartmentId: Number(this.formGroup.value.isDepartmentId),
      UpSertName: Global._USERNAME
    });

    this.http.post('http://localhost:5015/User/AddUser', formbody).subscribe(
      // เมื่อAPI Response กลับมาแล้วจะทำงานภายใต้ปีกกกา
      (response: ResponseModel) => {

        if (response.success) {
          alert('AddUser SUCCESS');
          this.router.navigate(['/users']);
        } else {
          alert('AddUser FAIL !');
        }
      },
      (error) => {
        console.log(error);
        alert('AddUser FAIL !!!');
      }
    );
  }

  clickCancelRegister(): void {
    this.router.navigate(['/login']);
  }

  clickCancel(): void {
    this.router.navigate(['/users']);
  }

  getDepartmentList(): void {
    this.http.get('http://localhost:5015/User/DropdownDepartment').subscribe((data: DropdownDepartmentModelList) => {
      if (data) {
        this.departmentList = data.departmentList;
      }
    });
  }

  checkAction(): boolean {
    return this.action === 'register' ? true : false;
  }

  getUserInfoById(id: number): void {
    const url = 'http://localhost:5015/User/UserInfo?Id=' + id;
    this.http.get(url).subscribe((data: UserProfileModel) => {
      if (data) {
        this.setUserInfoToForm(data);
      }
    });
  }

  setUserInfoToForm(object: UserProfileModel): void {
    this.formGroup.controls.isUsername.setValue(object.username);
    this.formGroup.controls.isName.setValue(object.name);
    this.formGroup.controls.isSurname.setValue(object.surname);
    this.formGroup.controls.isTelephone.setValue(object.telephone);
    this.formGroup.controls.isEmail.setValue(object.email);
    this.formGroup.controls.isDepartmentId.setValue(object.departmentId);
  }

  checkDuplicatePassword(): void {
    if (this.formGroup.value.isPassword !== this.formGroup.value.isRePassword) {
      this.duplicatePassword = false;
    } else {
      this.duplicatePassword = true;
    }
  }
}
