import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../_models/index';
import {environment} from '../../environments/environment';

@Injectable()
export class ShippingService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(environment.apiEndpoint + '/shipment/0/50');
  }

  create(shipment) {
    return this.http.post<any>(environment.apiEndpoint + '/shipment', shipment)
      .map(ship => {
        return ship;
      });
  }

  update(shipment) {
    return this.http.post<any>(environment.apiEndpoint + '/shipment/' + shipment.id, shipment)
      .map(ship => {
        return ship;
      });
  }

  delete(id: number) {
    return this.http.delete<any>(environment.apiEndpoint + '/shipment/' + id);
  }

  getShipmentItems(id) {
    return this.http.get<any>(environment.apiEndpoint + '/shipment-items/' + id);
  }

  addShipmentItem(id, item) {
    return this.http.post<any>(environment.apiEndpoint + '/shipment-items/' + id, item);
  }

  publishItem(id, data) {
    return this.http.post<any>(environment.apiEndpoint + '/shipment/publish/' + id, data);
  }

  editShipmentItem(id, item) {
    return this.http.post<any>(environment.apiEndpoint + '/shipment-items/' + id + '/' + item.itemId, item);
  }

  deleteShipmentItem(id, item) {
    return this.http.delete<any>(environment.apiEndpoint + '/shipment-items/' + id + '/' + item.itemId);
  }

  getShipmentById(id) {
    return this.http.get<any>(environment.apiEndpoint + '/shipment/' + id);
  }
}
