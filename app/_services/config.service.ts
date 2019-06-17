import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) {
  }
  getTruckType() {
    return this.http.get<any>(environment.apiEndpoint + '/config/truck-type');
  }
  getItemCategory() {
    return this.http.get<any>(environment.apiEndpoint + '/config/item-category');
  }
  getStatus() {
    return this.http.get<any>(environment.apiEndpoint + '/config/status');
  }
  getCountry() {
    return this.http.get<any>(environment.apiEndpoint + '/config/country');
  }
  getStates(id) {
    return this.http.get<any>(environment.apiEndpoint + '/config/state/' + id);
  }
}
