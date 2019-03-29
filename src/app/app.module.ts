import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { TimeAgoPipe } from 'time-ago-pipe';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BoardComponent } from './board/board.component';
import { CarComponent } from './car/car.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AddCarComponent } from './car/add-car/add-car.component';
import { QuoteComponent } from './dashboard/quote/quote.component';
import { ServicesComponent } from './dashboard/services/services.component';
import { AdviceComponent } from './dashboard/advice/advice.component';
import { AppointmentsComponent } from './dashboard/appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomepageComponent,
    SideBarComponent,
    BoardComponent,
    CarComponent,
    OverviewComponent,
    TimeAgoPipe,
    AddCarComponent,
    QuoteComponent,
    ServicesComponent,
    AdviceComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NotifierModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
