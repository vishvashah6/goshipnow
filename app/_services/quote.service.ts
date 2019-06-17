import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()


export class QuoteService {
  constructor(private http: HttpClient) {
  }
  sendQuote(data) {
    return this.http.post<any>(environment.apiEndpoint + '/quote/request', data);
    // return this.http.get<any>(environment.apiEndpoint + '/quote/request');
  }
}
