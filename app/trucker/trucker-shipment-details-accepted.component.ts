import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ToastrService} from 'ngx-toastr';
import {UserService, TruckerService} from '../_services/index';
import {Shipment} from '../_models/shippment';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'trucker-shipment-details-accepted.component.html'
})

export class TruckerShipmentDetailsAcceptedComponent implements OnInit {
  public searchControl: FormControl;
  public zoom: number;
  data: any = [];
  trucks: any = [];
  truck: any = {};
  isAdd: boolean;
  isLoad: boolean = false;
  showMarker: boolean;
  draggable;
  pLat: number = 51.678418;
  pLng: number = 7.809007;

  constructor(private router: Router,
              private userService: UserService,
              private truckerService: TruckerService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.truckerService.getAll().subscribe(trucks => {
      this.data = trucks;
      this.trucks = this.data.data;
    });

    this.zoom = 4;
  }

  addTruck() {
    localStorage.removeItem('currentTruck');
    this.router.navigate(['/truck-add']);
  }

  editTruck(item) {
    localStorage.setItem('currentTruck', JSON.stringify(item));
    this.router.navigate(['/truck-add']);
  }
}
