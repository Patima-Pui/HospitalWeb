import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Global } from '../global/global';
import { PermissionByUserIdModelList, PermissionModel } from '../Models/RoleModel.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isUsername = '';
  public selectMenu = 'Patient'; // defult selectMenu
  public permissions: PermissionModel[] = [];
  public isRoleName = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.isUsername = Global._USERNAME;
    this.getPermissions();
  }

  getPermissions(): void {
    this.http.get(environment.apiUrl + '/Roles/PermissionByUserId?Id=' + Global._USERID).subscribe(
      (response: PermissionByUserIdModelList) => {
        localStorage.setItem('permissions', JSON.stringify(response.permissions));
        this.permissions = response.permissions;
        console.log(this.permissions);
        this.isRoleName = response.role;
        console.log(this.isRoleName);
      }
    );
  }

  checkPermission(eventPermission: string): boolean {
    let result = false;
    if (this.permissions.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.permissions.length; i++) {
        if (this.permissions[i].permissionName === eventPermission) {
          result = this.permissions[i].permissionCheck;
          break;
        }
      }
    }
    return result;
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

  routeToRole(): void {
    this.selectMenu = 'Role';
    this.router.navigate(['/role']);
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
