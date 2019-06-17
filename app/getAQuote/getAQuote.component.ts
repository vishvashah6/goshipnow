import {Component, OnInit} from '@angular/core';
import {UserService, ConfigService} from '../_services/index';
import {QuoteService} from '../_services/quote.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-getquote',
  templateUrl: 'getAQuote.component.html'
})
export class GetAQuoteComponent implements OnInit {
  quote: any = {};
  countries = [{'key': 'can', 'value': 'Canada'}, {'key': 'usa', 'value': 'United States'}];
  states = [];
  truck: any = {};
  successQuote = false;
  public loading = false;

  constructor(private configService: ConfigService,
              private toastr: ToastrService,
              private quoteService: QuoteService) {
  }
  ngOnInit() {
    this.quote.pickup_country = 'usa';
    this.quote.delivery_country = 'usa';
    this.configService.getStates(this.quote.pickup_country).subscribe(data => {
      if (data.success) {
        console.log(data);
        this.states = data.state;
      } else {
        alert('error');
        this.toastr.error('Error in fetching states', 'Error !');
      }
    });
    this.configService.getStates(this.quote.delivery_country).subscribe(data => {
      if (data.success) {
        console.log(data);
        this.states = data.state;
      } else {
        alert('error');
        this.toastr.error('Error in fetching states', 'Error !');
      }
    });
  }

  onOptionsSelected(value) {
    this.states = [];
    this.configService.getStates(value).subscribe(states => {
      this.states = states.state;
    });
  }

  getData() {
    this.loading = true;
    this.quote.pickup_at = new Date(this.quote.pickup_at).getTime() / 1000;
    this.quote.delivery_at = new Date(this.quote.delivery_at).getTime() / 1000;
    this.quoteService.sendQuote(this.quote).subscribe(data => {
      if (data.success) {
        this.loading = false;
        this.successQuote = true;
      } else {
        this.loading = false;
        this.successQuote = false;
        this.toastr.error(data.error, 'Error !');
      }
    });
  }
}
