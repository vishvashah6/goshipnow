import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ToastrService} from 'ngx-toastr';
import {ShippingService, TruckerService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import {isNullOrUndefined} from 'util';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'trucker-shipment-details.component.html'
})

export class TruckerShipmentDetailsComponent implements OnInit {
  shipmentId;
  shipment;
  origin;
  destination;
  isLoaded = false;
  ship;
  isAccepted = false;
  job;
  loading = true;

  constructor(private router: Router,
              private shipService: ShippingService,
              private truckerService: TruckerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    if (localStorage.getItem('detailShipment')) {
      this.ship = JSON.parse(localStorage.getItem('detailShipment'));
      this.shipService.getShipmentById(this.ship.shipmentId).subscribe(ship => {
        if (ship.success) {
          this.shipment = ship.shipment;
          this.shipment.deliveryLatitude = Number(ship.shipment.deliveryLatitude);
          this.shipment.deliveryLongitude = Number(ship.shipment.deliveryLongitude);
          this.shipment.pickupLatitude = Number(ship.shipment.pickupLatitude);
          this.shipment.pickupLongitude = Number(ship.shipment.pickupLongitude);
          if (!isNullOrUndefined(ship.job)) {
            this.job = ship.job;
            this.isAccepted = true;
          }
          this.origin = {lat: this.shipment.pickupLatitude, lng: this.shipment.pickupLongitude};
          this.destination = {lat: this.shipment.deliveryLatitude, lng: this.shipment.deliveryLongitude};
          this.isLoaded = true;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    }
  }

  acceptShipment() {
    this.loading = true;
    const data = {
      shipmentId: this.ship.shipmentId,
      latitude: this.ship.latitude,
      longitude: this.ship.longitude
    };

    this.truckerService.acceptJob(data).subscribe(d => {
      if (d.success) {
        this.toastr.success('Job Accepted Successfully!!');
        this.job = d.job;
        this.isAccepted = true;
        this.loading = false;
      } else {
        this.loading = false;
        this.toastr.error(d.error, 'Error !');
      }
    });
  }

  pickupJob() {
    this.loading = true;
    const data = {
      latitude: this.job.latitude,
      longitude: this.job.longitude,
    }
    this.truckerService.pickedUptJob(data).subscribe(r => {
      if (r.success) {
        this.job = r.job;
        console.log(r);
        this.loading = false;
        this.toastr.success('Status updated successfully');
      } else {
        this.loading = false;
        this.toastr.error(r.error);
      }
    });
  }

  deliveredJob() {
    this.loading = true;
    const data = {
      latitude: this.job.latitude,
      longitude: this.job.longitude,
    }
    this.truckerService.deliveredJob(data).subscribe(r => {
      if (r.success) {
        this.job = r.job;
        console.log(r);
        this.toastr.success('Shipment delivered successfully');
        localStorage.removeItem('detailShipment');
        this.loading = false;
        this.router.navigate(['/find']);
      } else {
        this.loading = false;
        this.toastr.error(r.error);
      }
    });
  }

  cancelShipment() {
    this.loading = true;
    const data = {
      latitude: this.ship.latitude,
      longitude: this.ship.longitude
    };

    this.truckerService.cancelJob(data).subscribe(d => {
      if (d.success) {
        this.loading = false;
        this.toastr.success('Job Cancelled Successfully!!');
        this.router.navigate(['/find']);
      } else {
        this.loading = false;
        this.toastr.error(d.error, 'Error !');
      }
    });
  }
}
