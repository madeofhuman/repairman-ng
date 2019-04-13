import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { TimeAgoPipe } from 'time-ago-pipe';
import { of } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

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
      declarations: [
        RegisterComponent,
        TimeAgoPipe
      ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule ],
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
