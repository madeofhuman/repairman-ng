import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarComponent } from './car/car.component';
import { AuthGuard } from './auth.guard';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { LoginSigninGuard } from './login-signin.guard';
import { AddCarComponent } from './car/add-car/add-car.component';
import { QuoteComponent } from './dashboard/quote/quote.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { AdviceComponent } from './dashboard/advice/advice.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';

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
    path: '',
    component: HomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
