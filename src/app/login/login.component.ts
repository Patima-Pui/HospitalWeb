import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isUsername: string;
  public isPassword: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  clickLogin(): void{
    // create method login for receive input after click summit
    this.authService.login(this.isUsername, this.isPassword);
    Global._USERNAME = this.isUsername;
  }

  clickClear(): void{
    this.isUsername = '';
    this.isPassword = '';
  }

  register(): void{
    this.router.navigate(['/user-profile']);
  }
}
