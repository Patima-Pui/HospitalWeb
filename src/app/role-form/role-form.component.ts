import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PermissionModel, PermissionModelList } from '../Models/RoleModel.model';

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
  }

  save(){
    console.log(this.dataSource);
  }

}
