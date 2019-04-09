import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { OverviewComponent } from '../dashboard/overview/overview.component';
import { CarComponent } from '../car/car.component';
import { AddCarComponent } from '../car/add-car/add-car.component';
import { QuoteComponent } from '../dashboard/quote/quote.component';
import { ServicesComponent } from '../dashboard/services/services.component';
import { AdviceComponent } from '../dashboard/advice/advice.component';
import { AppointmentsComponent } from '../dashboard/appointments/appointments.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { By } from '@angular/platform-browser';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let serviceStub: any;

  beforeEach(async(() => {
    serviceStub = {
      getContent: () => of('Display notification'),
      notify: (arg1: string, arg2: string) => {
        return of('something');
      }
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        RegisterComponent,
        LoginComponent,
        DashboardComponent,
        OverviewComponent,
        CarComponent,
        AddCarComponent,
        QuoteComponent,
        ServicesComponent,
        AdviceComponent,
        AppointmentsComponent,
        HomepageComponent,
        TimeAgoPipe
      ],
      imports: [ FormsModule, HttpClientModule, AppRoutingModule ],
      providers: [{ provide: NotifierService, useValue: serviceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title of register', () => {
    expect(de.query(By.css('h3')).nativeElement.innerText).toBe('Register');
  });
});
