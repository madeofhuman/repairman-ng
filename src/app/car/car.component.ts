import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/models';
import { CarService } from './car.service';
import { NotifierService } from 'angular-notifier';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
  animations: [
    trigger('postStagger', [
      transition('* <=> *', [
        query(':enter', [
          style({
            opacity: 0,
            transform: 'translateY(-15px)'
          }),
          stagger('50ms',
          animate('550ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0px)'
          })))
        ], {
          optional: true
        }),
        query(':leave', animate('550ms ease-out', style({
          opacity: 0
        })), {
          optional: true
        })
      ])
    ])
  ]
})
export class CarComponent implements OnInit {

  private notifier: NotifierService;
  cars: Car[];

  constructor(
    private carService: CarService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe((cars) => {
        this.cars = cars;
      });
  }

  carDetails(car: Car): void {
    console.log(car);
  }

  removeCar(selectedCar: Car): void {
    this.carService.removeCar(selectedCar)
      .subscribe(() => {
        this.cars = this.cars.filter((car) => selectedCar.id !== car.id);
        this.notifier.notify('success', `Your ${selectedCar.make} has been successfully deleted.`);
      });
  }

}
