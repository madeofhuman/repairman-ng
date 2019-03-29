import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/car/car.service';
import { Car, Quote } from 'src/app/shared/models';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  cars: Car[];
  carQuotes: Quote[];
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    private carService: CarService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUserCars();
  }

  getUserCars(): void {
    this.carService.getCars()
      .subscribe((cars) => {
        this.cars = cars;
        this.setQuotes(cars);
      });
  }

  setQuotes(cars: Car[]): void {
    cars = Array.isArray(cars) ? cars : [];
    cars.map((car) => {
      this.carQuotes = [...this.carQuotes || [], ...car.quotes];
    });
  }

  visitDashboard() {
    this.router.navigate(['/dashboard']);
  }

  submitForm(car: any, desc: any) {
    if (!(
      car.value && typeof +car.value === 'number' && +car.value !== 0
    )) {
      return this.notifier.notify('error', 'Select your car from the drop-down');
    }

    if (!(
      desc.value && desc.value.length > 10
    )) {
      return this.notifier.notify('error', 'Mileage description must be atleast 10 characters');
    }

    const quoteObject = JSON.stringify({ description: desc.value });

    return this.carService.addQuote(quoteObject, +car.value)
      .subscribe(() => {
        this.notifier.notify('success', 'Your quote has been added successfully');
        this.router.navigate(['/dashboard/cars']);
      });
  }

}
