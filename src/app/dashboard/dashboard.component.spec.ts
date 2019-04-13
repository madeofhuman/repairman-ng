import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierService } from 'angular-notifier';

import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let serviceStub: Partial<any>;

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
        TimeAgoPipe
      ],
      imports: [ RouterTestingModule, FormsModule ],
      providers: [{ provide: NotifierService, useValue: serviceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
