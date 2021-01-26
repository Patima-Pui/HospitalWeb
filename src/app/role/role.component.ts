import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RoleModel, RoleModelList } from '../Models/RoleModel.model';
import { DeleteRoleDialogComponent } from './delete-role-dialog/delete-role-dialog.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: string[] = ['number', 'role', 'edit', 'delete'];
  public dataSource = new MatTableDataSource<RoleModel>();
  public formGroup: FormGroup;
  public roleList: RoleModel[];

  constructor(
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getRole();
  }

  public initForm(): void {
    this.formGroup = new FormGroup({
      isSearch: new FormControl(''),
    });
  }

  getRole(): void {
    this.http.get(environment.apiUrl + '/Roles/RolesAll').subscribe((roledata: RoleModelList) => {
      console.log('Role : ', roledata);
      this.roleList = roledata.roleList;
      this.dataSource = new MatTableDataSource<RoleModel>(this.roleList);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchRole(): void {
  }

  addRole(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        Action: 'add'
      }
    };
    this.router.navigate(['/role-form'], navigationExtras);
  }

  editRole(roleId: number, role: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        RoleId: roleId,
        RoleName: role,
        Action: 'edit'
      }
    };
    this.router.navigate(['/role-form'], navigationExtras);
  }

  deleteRole(roleId: number, roleName: string): void {
    const dialogRef = this.dialog.open(DeleteRoleDialogComponent, {
      width: '400px',
      // height: '250px',
      data: new RoleModel({ role: roleName, id: roleId })
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRole();
      }
    });

  }

}
