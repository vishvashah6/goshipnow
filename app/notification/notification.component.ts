import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ToastrService} from 'ngx-toastr';

import {UserService, TruckerService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import {isNullOrUndefined} from "util";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit {
  notifications: any = [];
  currentUser:any = {};
  public loading = true;
  isShipper;
  index;
  constructor(private router: Router,
              private userService: UserService,
              private truckerService: TruckerService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  deleteNotification(obj) {
    this.userService. deleteNotifications(obj.id).subscribe(data => {
      if (data) {
        this.index = this.notifications.indexOf(obj, 0);
        if (this.index > -1) {
          this.notifications.splice(this.index, 1);
        }
      }
    });
  }
  readNotifications(obj, status) {
    this.userService.readNotifications(obj.id, status.read).subscribe(data => {
      if (status.read === 0) {
        status.read = 1;
        }
    });
  }

  ngOnInit() {
    this.loading = true;
    this.currentUser = JSON.parse(localStorage.getItem('userProfile'));
    if (!isNullOrUndefined(this.currentUser)) {
      if (this.currentUser.type === 'shipper') {
        this.isShipper = true;
      } else {
        this.isShipper = false;
      }
    }

    this.userService.getNotifications().subscribe(data => {
      if (data.success) {
        this.loading = false;
        this.notifications = data.notifications;
      }
    });
  }

}
