import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isUsername: string;
  public isPassword: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  clickLogin(): void{
    // create method login for receive input after click summit
    this.authService.login(this.isUsername, this.isPassword);
  }

  clickClear(): void{
    this.isUsername = '';
    this.isPassword = '';
  }
}
