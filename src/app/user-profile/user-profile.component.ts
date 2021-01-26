import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../global/global';
import { DropdownDepartmentModel, DropdownDepartmentModelList, RequestRegister, ResponseModel, UserProfileModel } from '../Models/UserModel.model';
import CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { RoleModel, RoleModelList } from '../Models/RoleModel.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
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
  public isRoleId: number;
  public roleList: RoleModel[];
  public action: string; // register, add, edit
  public userId: number;
  public duplicatePassword = true;
  public messageError: string;
  public matcher = new MyErrorStateMatcher();
  constructor(
    private router: Router, // transmit
    private route: ActivatedRoute, // receive
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.action = 'register';
    this.initForm();
    this.getDepartmentList();
    this.getRoleList();
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
      isUsername: new FormControl('', [Validators.required]),
      isPassword: new FormControl('', [Validators.required]),
      isRePassword: new FormControl('', [Validators.required]),
      isName: new FormControl('', [Validators.required]),
      isSurname: new FormControl('', [Validators.required]),
      isTelephone: new FormControl('', [Validators.required]),
      isEmail: new FormControl('', [Validators.required, Validators.email]),
      isDepartmentId: new FormControl(0, [Validators.required]),
      isRoleId: new FormControl(3, [Validators.required]),
    });
  }

  clickRegister(): void {
    if (!this.duplicatePassword) {
      alert('Please check invalid data.');
      return;
    }

    const hashPassword = CryptoJS.SHA256(this.formGroup.value.isPassword);
    const encryptPassword = hashPassword.toString(CryptoJS.enc.Base64);
    const formbody = new RequestRegister({
      Username: this.formGroup.value.isUsername,
      Password: encryptPassword,
      Name: this.formGroup.value.isName,
      Surname: this.formGroup.value.isSurname,
      Telephone: this.formGroup.value.isTelephone,
      Email: this.formGroup.value.isEmail,
      DepartmentId: Number(this.formGroup.value.isDepartmentId),
      UpSertName: this.formGroup.value.isUsername,
      RoleId: 3 // when user register by yourself,will set defult to General role
    });

    this.http.post(environment.apiUrl + '/User/Register', formbody).subscribe(
      // เมื่อAPI Response กลับมาแล้วจะทำงานภายใต้ปีกกกา
      (response: ResponseModel) => {

        if (response.success) {
          alert('REGISTER SUCCESS');
          this.router.navigate(['/login']);
        } else {
          this.openDialog(response.message);
        }

      },
      (error) => {
        console.log(error);
        alert('REGISTER FAIL !!!');
      }
    );
  }

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(DialogErrorComponent, {
      width: '400px',
      // height: '250px',
      data: message
    });
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
      UpSertName: Global._USERNAME,
      RoleId: Number(this.formGroup.value.isRoleId)
    });

    this.http.put(environment.apiUrl + '/User/UpdateUserProfile', formbody).subscribe(
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
      UpSertName: Global._USERNAME,
      RoleId: Number(this.formGroup.value.isRoleId)
    });

    this.http.post(environment.apiUrl + '/User/AddUser', formbody).subscribe(
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
    this.http.get(environment.apiUrl + '/User/DropdownDepartment').subscribe((data: DropdownDepartmentModelList) => {
      if (data) {
        this.departmentList = data.departmentList;
      }
    });
  }

  getRoleList(): void {
    this.http.get(environment.apiUrl + '/Roles/RolesAll').subscribe((roledata: RoleModelList) => {
      if (roledata) {
        this.roleList = roledata.roleList;
      }
    });
  }

  checkAction(): boolean {
    return this.action === 'register' ? true : false;
  }

  getUserInfoById(id: number): void {
    const url = environment.apiUrl + '/User/UserInfo?Id=' + id;
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
    this.formGroup.controls.isRoleId.setValue(object.roleId);
    console.log(object);
  }

  checkDuplicatePassword(): void {
    if (this.formGroup.value.isPassword !== this.formGroup.value.isRePassword) {
      this.duplicatePassword = false;
    } else {
      this.duplicatePassword = true;
    }
  }

  setValidation(formControlsNames: string[]): void {
    formControlsNames.forEach(name => {
      this.formGroup.controls[name].markAsTouched();
    });
  }

  isInvalidForm(): boolean {
    this.setValidation(['isUsername', 'isPassword', 'isRePassword', 'isName', 'isSurname', 'isTelephone', 'isEmail']);
    if (this.action !== 'edit') {
      return this.formGroup.controls.isUsername.invalid
        || this.formGroup.controls.isPassword.invalid
        || this.formGroup.controls.isRePassword.invalid
        || this.formGroup.controls.isName.invalid
        || this.formGroup.controls.isSurname.invalid
        || this.formGroup.controls.isTelephone.invalid
        || this.formGroup.controls.isEmail.invalid;
    } else {
      return this.formGroup.controls.isUsername.invalid
        || this.formGroup.controls.isName.invalid
        || this.formGroup.controls.isSurname.invalid
        || this.formGroup.controls.isTelephone.invalid
        || this.formGroup.controls.isEmail.invalid;
    }
  }

  save(): void {
    if (this.isInvalidForm()) { return; } // If this form is invalid,will skip(can't save until correct form)
    if (this.action === 'register') {
      this.clickRegister();
    }
    else if (this.action === 'add') {
      this.clickAdd();
    }
    else if (this.action === 'edit') {
      this.clickSaveEdit();
    }
  }
}
