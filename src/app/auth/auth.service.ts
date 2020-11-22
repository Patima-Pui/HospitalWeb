import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RequestLogin, RequestRegister, ResponseModel } from '../Models/UserModel.model';

@Injectable()
export class AuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn(): any {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    login(username: string, password: string): void {
        // set format "body" with type:RequestLogin Model.
        // const คือการประกาศตัวแปรแบบไม่สามารถกำหนดค่าใหม่ได้
        const body = new RequestLogin({
            Username: username,
            Password: password
        });

        this.http.post('http://localhost:5015/User/Login', body).subscribe(
            // เมื่อAPI Response กลับมาแล้วจะทำงานภายใต้ปีกกกา
            (response: ResponseModel) => {

                if (response.success) {
                    alert('LOGIN SUCCESS');
                    this.loggedIn.next(true);
                    this.router.navigate(['/patients']);
                } else {
                    alert('LOGIN FAIL !');
                }

            },
            (error) => {
                console.log(error);
                alert('LOGIN FAIL !!!');
            }
        );
    }

    logout(): void {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }

}
