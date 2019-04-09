import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierService } from 'angular-notifier';

import { of } from 'rxjs';
import { CarComponent } from '../car/car.component';
import { AppRoutingModule } from '../app-routing.module';
import { QuoteComponent } from './quote/quote.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from './dashboard.component';
import { AdviceComponent } from './advice/advice.component';
import { OverviewComponent } from './overview/overview.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ServicesComponent } from './services/services.component';
import { RegisterComponent } from '../register/register.component';
import { AddCarComponent } from '../car/add-car/add-car.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { AppointmentsComponent } from './appointments/appointments.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let serviceStub: any;

  beforeEach(async(() => {
    serviceStub = {
      getContent: () => of('Display notification'),
      notify: (arg1: string, arg2: string) => {
        return of('something');
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SideBarComponent,
        RegisterComponent,
        LoginComponent,
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
      imports: [ AppRoutingModule, FormsModule ],
      providers: [{ provide: NotifierService, useValue: serviceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const store = {};

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return store[key] = value + '';
    });

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key];
    });

    localStorage.setItem('auth_token', 'auth');
    localStorage.setItem('auth_user', JSON.stringify({
      name: 'jigsaw',
      email: 'email'
    }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
