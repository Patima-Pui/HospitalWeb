import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestRegister, ResponseModel } from '../Models/UserModel.model';

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

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  clickRegister(): void {
    const formbody = new RequestRegister({
        Username: this.isUsername,
        Password: this.isPassword,
        RePassword: this.isRePassword,
        Name: this.isName,
        Surname: this.isSurname,
        Telephone: this.isTelephone,
        Email: this.isEmail,
        DepartmentId: Number(this.isDepartmentId)
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
