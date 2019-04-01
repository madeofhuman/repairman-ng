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
  isEditingCar: Car = null;
  make: string;
  trim: string;
  model: string;

  constructor(
    private carService: CarService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getCars();
  }

  checkCarStatus(car: any): boolean {
    return Array.isArray(car);
  }

  getCars(): void {
    this.carService.getCars()
      .subscribe((cars) => {
        this.cars = cars;
      });
  }

  removeCar(selectedCar: Car): void {
    this.carService.removeCar(selectedCar)
      .subscribe(() => {
        this.cars = this.cars.filter((car) => selectedCar.id !== car.id);
        this.notifier.notify('success', `Your ${selectedCar.make} has been successfully deleted.`);
      });
  }

  edit(car: Car): void {
    this.isEditingCar = car;
    this.make = car.make;
    this.model = car.model;
    this.trim = car.trim;
  }

  saveEdit(id: number, make, model, trim): void {
    this.isEditingCar = null;
    console.log(make, trim, model);
    if (!(make && model && trim)) {
      return this.notifier.notify('error', 'The form contains empty fields');
    }

    const carObject = JSON.stringify({
      make,
      model,
      trim
    });

    this.carService.editCar(id, carObject)
      .subscribe(() => {
        this.notifier.notify('success', 'Car details updated');
        this.cars = this.cars.map((car) => {
          if (car.id === id) {
            car.make = make;
            car.model = model;
            car.trim = trim;
          }
          return car;
        });
      });
  }

  closeEdit(make, model, trim): void {
    this.make = '';
    this.model = '';
    this.trim = '';
    this.isEditingCar = null;
  }

}
