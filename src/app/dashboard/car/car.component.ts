import { Component, OnInit } from '@angular/core';
import { Car } from '../../shared/models';
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

  /**
   * Verify the container for our car objects
   * @param car - car objects
   * @returns boolean
   */
  checkCarStatus(car: any): boolean {
    return Array.isArray(car);
  }

  /**
   * Set a users' car after subscription to
   * our car service
   */
  getCars(): void {
    this.carService.getCars()
      .subscribe((cars) => {
        this.cars = cars;
      });
  }

  /**
   * Delete a user car
   * @param selectedCar -  car selected for deletion
   */
  removeCar(selectedCar: Car): void {
    this.carService.removeCar(selectedCar)
      .subscribe(() => {
        this.cars = this.cars.filter((car) => selectedCar.id !== car.id);
        this.notifier.notify('success', `Your ${selectedCar.make} has been successfully deleted.`);
      });
  }

  /**
   * Set car undergoing edits
   * @param car - A single user car object
   */
  edit(car: Car): void {
    this.isEditingCar = car;
    this.make = car.make;
    this.model = car.model;
    this.trim = car.trim;
  }

  /**
   * Persist user changes upon save edit information
   * @param id - car id
   * @param make - car make
   * @param model - car model
   * @param trim - car trim
   * @returns void
   */
  saveEdit(id: number, make: string, model: string, trim: string): void {
    this.isEditingCar = null;
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

  /**
   * Close the edit interface and reset edit state
   * @param make - car make
   * @param model - car model
   * @param trim - car trim
   * @returns void
   */
  closeEdit(make: any, model: any, trim: any): void {
    this.make = '';
    this.model = '';
    this.trim = '';
    this.isEditingCar = null;
  }

}
