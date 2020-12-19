import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { MenuLayoutComponent } from './layout/menu-layout.component';
import { LoginComponent } from './login/login.component';
import { ManagelogComponent } from './managelog/managelog.component';
import { MenuComponent } from './menu/menu.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { PatientComponent } from './patient/patient.component';
import { RoleComponent } from './role/role.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'patients',
        component: PatientComponent
      },
      {
        path: 'commig-soon',
        component: CommingSoonComponent
      },
      {
        path: 'patients/patient-info',
        component: PatientInfoComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'managelog',
        component: ManagelogComponent
      },
      {
        path: 'role',
        component: RoleComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: UserProfileComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
