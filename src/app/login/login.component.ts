import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/global';
import CryptoJS from 'crypto-js';

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
    const hashPassword = CryptoJS.SHA256(this.isPassword);
    const encryptPassword = hashPassword.toString(CryptoJS.enc.Base64);
    this.authService.login(this.isUsername, encryptPassword);
    Global._USERNAME = this.isUsername;
  }

  clickClear(): void{
    this.isUsername = '';
    this.isPassword = '';
  }

  register(): void{
    this.router.navigate(['/register']);
  }
}
