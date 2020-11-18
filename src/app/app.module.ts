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
    UserProfileComponent
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
    MatButtonModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
