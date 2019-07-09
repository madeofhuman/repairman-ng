import { Component, OnInit } from '@angular/core';
import { Quote } from 'src/app/shared/models';
import {Router} from "@angular/router"
import { QuoteService } from 'src/app/dashboard/quote/quote.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  quotes: Quote[];

  constructor(
    private quoteService: QuoteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes(): void {
    this.quoteService.getAllQuotes()
      .subscribe((quotes) => {
        console.log('quotes>>>', quotes);
        this.quotes = quotes;
      })
  }

  navigateToQuotePage(quote): void {
    localStorage.setItem('quote', JSON.stringify(quote));
    this.router.navigate(['/admin/requests', quote.id]);
  }

  carDetails(car): string {
    return `${car && car.make} ${car && car.model} - ${car && car.trim}`;
  }

}
