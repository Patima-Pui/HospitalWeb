import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoleModel, RoleModelList } from '../Models/RoleModel.model';

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
    this.http.get('http://localhost:5015/Roles/RolesAll').subscribe((roledata: RoleModelList) => {
      console.log('Role : ', roledata);
      this.roleList = roledata.roletable;
      this.dataSource = new MatTableDataSource<RoleModel>(this.roleList);
      this.dataSource.paginator = this.paginator;
    });
  }

  searchRole(): void {
  }

  addRole(): void {
  }

  editRole(roleId: number): void {
  }

  deleteRole(roleId: number): void {
  }

}