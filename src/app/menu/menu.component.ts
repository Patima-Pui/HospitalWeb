import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
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

  clickLogout(): void {
    this.authService.logout();
  }

}
