import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Global } from '../global/global';
import { InsertRoleModel, PermissionByIdModelList, PermissionModel, PermissionModelList, UpdateRoleModel } from '../Models/RoleModel.model';
import { ResponseModel } from '../Models/UserModel.model';
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['permissionId', 'permissionName', 'permissionEnable'];
  public dataSource = new MatTableDataSource<PermissionModel>();
  public isRoleName = '';
  public action = 'add';
  public roldId: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPermissionAll();
    this.getExtras();
  }

  getExtras(): void {
    this.route.queryParams.subscribe((param) => {
      if (param.Action !== undefined) {
        this.action = param.Action;
        if (this.action === 'edit') {
          this.isRoleName = param.RoleName;
          this.roldId = Number(param.RoleId);
          this.getPermissionByRoleId(this.roldId);
        }
      }
    });
  }

  getPermissionAll(): void {
    this.http.get(environment.apiUrl + '/Roles/PermissionAll').subscribe((permissionList: PermissionModelList) => {
      this.dataSource = new MatTableDataSource<PermissionModel>(permissionList.permissiontable);
      this.dataSource.paginator = this.paginator;
    });
  }

  getPermissionByRoleId(roleId: number): void {
    this.http.get(environment.apiUrl + '/Roles/PermissionById?roleId=' + roleId).subscribe((permissionList: PermissionByIdModelList) => {
      this.dataSource = new MatTableDataSource<PermissionModel>(permissionList.permissionIdList);
      this.dataSource.paginator = this.paginator;
    });
  }

  clickSaveAdd(): void {
    console.log(this.dataSource.data);
    const formbody = new InsertRoleModel({
      roleName: this.isRoleName,
      username: Global._USERNAME,
      permissionList: this.dataSource.data
    });
    this.http.post(environment.apiUrl + '/Roles/InsertRole', formbody).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          alert('SUCCESS');
          this.router.navigate(['/role']);
        } else {
          alert('FAIL');
        }
      },
      (error) => {
        console.log(error);
        alert('FAIL');
      }
    );
  }

  clickSaveEdit(): void {
    const formbody = new UpdateRoleModel({
      roleId: this.roldId,
      username: Global._USERNAME,
      permissionList: this.dataSource.data
    });
    this.http.put(environment.apiUrl + '/Roles/UpdateRole', formbody).subscribe(
      (response: ResponseModel) => {
        if (response.success) {
          alert('UPDATE SUCCESS');
          this.router.navigate(['/role']);
        } else {
          alert('UPDATE FAIL !');
        }
      },
      (error) => {
        console.log(error);
        alert('UPDATE FAIL !!!');
      }
    );
  }

  clickCancel(): void {
    this.router.navigate(['/role']);
  }

}
