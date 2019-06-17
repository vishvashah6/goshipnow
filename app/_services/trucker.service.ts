import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class TruckerService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(environment.apiEndpoint + '/truck');
  }

  create(data) {
    return this.http.post<any>(environment.apiEndpoint + '/truck ', data)
      .map(truck => {
        return truck;
      });
  }

  update(data) {
    return this.http.post<any>(environment.apiEndpoint + '/truck/' + data.id, data)
      .map(truck => {
        return truck;
      });
  }

  delete(id: number) {
    return this.http.delete<any>(environment.apiEndpoint + '/truck/' + id);
  }

  getInsurance() {
    return this.http.get<any>(environment.apiEndpoint + '/user/insurance');
  }

  updateInsurance(data) {
    return this.http.post(environment.apiEndpoint + '/user/insurance', data);
  }

  getLicence() {
    return this.http.get<any>(environment.apiEndpoint + '/user/license');
  }

  updateLicence(data) {
    return this.http.post<any>(environment.apiEndpoint + '/user/license', data);
  }

  findJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/find', data);
  }

  acceptJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/accept', data);
  }

  activeJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/active', data);
  }

  updatetJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/update', data);
  }

  pickedUptJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/picked-up', data);
  }

  deliveredJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/delivered', data);
  }

  cancelJob(data) {
    return this.http.post<any>(environment.apiEndpoint + '/job/cancel', data);
  }

  jobHistory() {
    return this.http.get<any>(environment.apiEndpoint + '/job/history');
  }

  updateInsurenceImage(data) {
    return this.http.post<any>(environment.apiEndpoint + '/user/insurance/image', data);
  }

  updateLicenceImage(data) {
    return this.http.post<any>(environment.apiEndpoint + '/user/license/image', data);
  }
}
