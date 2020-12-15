import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { MenuLayoutComponent } from './layout/menu-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './users/users.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagelogComponent } from './managelog/managelog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsersDialogComponent } from './users/users-dialog/users-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PatientInfoDialogComponent } from './patient/patient-info-dialog/patient-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccountComponent,
    LoginComponent,
    PatientComponent,
    MenuLayoutComponent,
    LoginLayoutComponent,
    UsersComponent,
    CommingSoonComponent,
    UserProfileComponent,
    PatientInfoComponent,
    DashboardComponent,
    ManagelogComponent,
    UsersDialogComponent,
    PatientInfoDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [AuthService, MatDatepickerModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
