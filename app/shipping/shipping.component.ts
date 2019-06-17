import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';

import {UserService, ShippingService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import { ToastrService } from 'ngx-toastr';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'shipping.component.html'
})

export class ShippingComponent implements OnInit {

  data: any = [];
  shippments: any = [];
  pendingShippments: any = [];
  openShippments: any = [];
  completedShippments: any = [];
  shipment: Shipment = {};
  isOpen = true;
  isCompleted = false;
  isPending = false;
  noJobs;

  constructor(private router: Router,
              private userService: UserService,
              private shipperService: ShippingService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.shipperService.getAll().subscribe(shippments => {
      this.toastr.success('Fetch all data successfully!', 'Success');
      this.data = shippments;
      this.shippments = this.data.shipments;
      console.log(this.shippments);

      this.pendingShippments = this.shippments.filter(ship => ship.status === 'unlisted');
      this.openShippments = this.shippments.filter(ship => ship.status === 'listed');
      this.completedShippments = this.shippments.filter(ship => ship.status === 'delivered');
    });
  }

  openShip() {
    this.isOpen = true;
    this.isCompleted = false;
    this.isPending = false;
  }

  pendingShip() {
    this.isOpen = false;
    this.isCompleted = false;
    this.isPending = true;
  }

  completedShip() {
    this.isOpen = false;
    this.isCompleted = true;
    this.isPending = false;
  }

  editShipment(item) {
    localStorage.setItem('currentSite', JSON.stringify(item));
    this.router.navigate(['/add-shipping']);
  }

  addShipment() {
    localStorage.removeItem('currentSite');
    this.router.navigate(['/add-shipping']);
  }

  trackShip(item) {
    localStorage.setItem('currentSite', JSON.stringify(item));
    this.router.navigate(['/track']);
  }
}
