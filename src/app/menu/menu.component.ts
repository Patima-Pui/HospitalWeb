import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isUsername = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isUsername = Global._USERNAME;
  }

  routeToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  routeToPatient(): void {
    this.router.navigate(['/patients']);
  }

  routeToUser(): void {
    this.router.navigate(['/users']);
  }

  routeToCommingSoon(): void {
    this.router.navigate(['/commig-soon']);
  }

  routeToManageLog(): void {
    this.router.navigate(['/managelog']);
  }

  clickLogout(): void {
    this.authService.logout();
  }

}
