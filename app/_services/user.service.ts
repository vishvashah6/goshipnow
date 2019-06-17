import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../_models/index';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getById() {
    return this.http.get<any>(environment.apiEndpoint + '/user/profile');
  }

  create(user: User) {
    return this.http.post<any>(environment.apiEndpoint + '/user/register', user);
  }

  update(user: User) {
    return this.http.post<any>(environment.apiEndpoint + '/user/profile', user);
  }

  forgetPassword(user: User) {
    return this.http.post<any>(environment.apiEndpoint + '/user/forgot', user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  subscibe(data) {
    return this.http.post<any>(environment.apiEndpoint + '/newsletter/subscribe', data);
  }

  getNotifications() {
    return this.http.get<any>(environment.apiEndpoint + '/notifications/0/100');
  }

  deleteNotifications(id: number) {
    return this.http.delete(environment.apiEndpoint + '/notifications/' + id);
  }

  readNotifications(id: number, data) {
    return this.http.patch<any>(environment.apiEndpoint + '/notifications/' + id, data);
  }

  updateImage(data) {
    return this.http.post<any>(environment.apiEndpoint + '/user/image', data);
  }

  sendContacts(data) {
   return this.http.post<any>(environment.apiEndpoint + '/contact/request', data);
  }

}
