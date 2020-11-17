import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router
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


}
