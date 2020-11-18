import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  clickRegister(): void {
    this.authService.register(
      this.isUsername,
      this.isPassword,
      this.isRePassword,
      this.isName,
      this.isSurname,
      this.isTelephone,
      this.isEmail,
      this.isDepartmentId
    );
  }

  clickCancel(): void {
    this.router.navigate(['/login']);
  }
}
