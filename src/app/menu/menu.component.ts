import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isUsername = '';
  public selectMenu = 'Patient'; // defult selectMenu

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isUsername = Global._USERNAME;
  }

  routeToDashboard(): void {
    this.selectMenu = 'Dashboard';
    this.router.navigate(['/dashboard']);
  }

  routeToPatient(): void {
    this.selectMenu = 'Patient';
    this.router.navigate(['/patients']);
  }

  routeToUser(): void {
    this.selectMenu = 'User';
    this.router.navigate(['/users']);
  }

  routeToCommingSoon(): void {
    this.selectMenu = 'RecFaces';
    this.router.navigate(['/commig-soon']);
  }

  routeToManageLog(): void {
    this.selectMenu = 'Log';
    this.router.navigate(['/managelog']);
  }

  clickLogout(): void {
    this.authService.logout();
  }

  clickEditProfile(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        UserId: Global._USERID,
        Action: 'edit'
      }
    };
    this.router.navigate(['/user-profile'], navigationExtras);

  }
}
