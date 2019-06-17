import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {} from 'googlemaps';

import {UserService, ShippingService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import {ToastrService} from 'ngx-toastr';

 @Component({
    moduleId: module.id.toString(),
   templateUrl: 'track.component.html'
})
export class TrackComponent implements OnInit {
  origin;
  destination;
  lat = 53.544389;
  lng = -113.490927;
  platitude;
  plongitude;
  dlatitude;
  dlongitude;
  shipment: any = {};
  geolocationPosition;

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position,
            console.log(position);
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
    if (localStorage.getItem('currentSite')) {
      this.shipment = JSON.parse(localStorage.getItem('currentSite'));
      console.log(this.shipment);

      this.lat = this.platitude = Number(this.shipment.pickupLatitude);
      this.lng = this.plongitude = Number(this.shipment.pickupLongitude);
      this.dlatitude = Number(this.shipment.deliveryLatitude);
      this.dlongitude = Number(this.shipment.deliveryLongitude);

      this.origin = {lat: this.lat, lng: this.lng};
      this.destination = {lat: this.dlatitude, lng: this.dlongitude};
    }
  }
}
