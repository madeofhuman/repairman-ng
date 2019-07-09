import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Car, Quote } from 'src/app/shared/models';
import { NotifierService } from 'angular-notifier';
import { CarService } from '../car/car.service';

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
    private notifierService: NotifierService,
    private route: ActivatedRoute,
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.getUserCars();
  }

  /**
   * Set a users cars and quotes after subscribing
   * to our car service
   * @return void
   */
  getUserCars(): void {
    this.carService.getCars()
      .subscribe((cars) => {
        this.cars = cars;
        this.setQuotes(cars);
      });
  }

  /**
   * Set user car quotes in quotes section of
   * the dashboard
   * @param cars - An array of car objects
   * @returns void
   */
  setQuotes(cars: Car[]): void {
    cars = Array.isArray(cars) ? cars : [];
    cars.map((car) => {
      this.carQuotes = [...this.carQuotes || [], ...car.quotes];
    });
  }

  /**
   * Navigate to the dashboard
   * @returns - void
   */
  visitDashboard() {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Submit a new car quote
   * @param car - User car object
   * @param desc - mileage/description
   * @returns Subscription from car-quote service
   */
  submitForm(car: any, desc: any) {
    if (!(
      car.value && typeof +car.value === 'number' && +car.value !== 0
    )) {
      return this.notifier.notify('error', 'Select your car from the drop-down');
    }

    if (!(
      desc.value && desc.value.length > 10
    )) {
      return this.notifier.notify('error', 'Mileage description must be at least 10 characters');
    }

    const quoteObject = JSON.stringify({ description: desc.value });

    return this.carService.addQuote(quoteObject, +car.value)
      .subscribe(() => {
        this.notifier.notify('success', 'Your quote has been added successfully');
        this.router.navigate(['/dashboard/cars']);
      });
  }

  carDetails(car): string {
    return `${car && car.make} ${car && car.model} - ${car && car.trim}`;
  }

}
