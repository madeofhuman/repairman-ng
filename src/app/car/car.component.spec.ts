import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarComponent } from './car.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';

fdescribe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;
  let de: DebugElement;
  let serviceStub: any;

  beforeEach(async(() => {
    serviceStub = {
      getContent: () => of('Display notification')
    };

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
      declarations: [ CarComponent, TimeAgoPipe ],
      providers: [{ provide: NotifierService, useValue: serviceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
