import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { CarComponent } from './dashboard/car/car.component';
import { LoginSigninGuard } from './auth/login-signin.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { QuoteComponent } from './dashboard/quote/quote.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdviceComponent } from './dashboard/advice/advice.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddCarComponent } from './dashboard/car/add-car/add-car.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginSigninGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginSigninGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'cars',
        component: CarComponent
      },
      {
        path: 'cars/new',
        component: AddCarComponent
      },
      {
        path: 'quotes',
        component: QuoteComponent
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'advice',
        component: AdviceComponent
      },
      {
        path: 'appointment',
        component: AppointmentsComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        component: AdminOverviewComponent,
      },
      {
        path: 'requests',
        component: RequestsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  },
  {
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
