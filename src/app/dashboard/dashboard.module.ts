import { NgModule } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { QuoteComponent } from './quote/quote.component';
import { DashboardComponent } from './dashboard.component';
import { AdviceComponent } from './advice/advice.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ServicesComponent } from './services/services.component';
import { OverviewComponent } from './overview/overview.component';
import { AppointmentsComponent } from './appointments/appointments.component';


import { CarComponent } from './car/car.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddCarComponent } from './car/add-car/add-car.component';


@NgModule({
  declarations: [
    TimeAgoPipe,
    CarComponent,
    QuoteComponent,
    AddCarComponent,
    AdviceComponent,
    SideBarComponent,
    OverviewComponent,
    ServicesComponent,
    DashboardComponent,
    AppointmentsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
  ]
})
export class DashboardModule { }
