import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ToastrService} from 'ngx-toastr';

import {ConfigService, TruckerService} from '../_services/index';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {isNullOrUndefined} from 'util';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'trucker-add.component.html'
})

export class TruckerAddComponent implements OnInit {
  section1 = false;
  section2 = true;
  lat;
  lng;
  latitude;
  longitude;
  truckTypes = [];
  sIndex;
  truck: any = {};

  constructor(private router: Router,
              private truckerService: TruckerService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private configService: ConfigService,
              private ngZone: NgZone) {
  }

  @ViewChild('placesRef1') placesRef1: GooglePlaceDirective;

  public handleAddressChange1(address: any) {
    if (!isNullOrUndefined(address)) {
      this.truck.latitude = this.lat = address.geometry.location.lat();
      this.truck.longitude = this.lng = address.geometry.location.lng();
    }
  }

  ngOnInit() {
    this.lat = 53.11;
    this.lng = 28.35;
    this.configService.getTruckType().subscribe(data => {
      if (data.success) {
        this.truckTypes = data['truck-type'];
        if (localStorage.getItem('currentTruck')) {
          this.truck = JSON.parse(localStorage.getItem('currentTruck'));
          this.lat = this.truck.latitude = Number(this.truck.latitude);
          this.lng = this.truck.longitude = Number(this.truck.longitude);
          this.truckTypes.forEach((td, index) => {
            if (td.key.toLowerCase() === this.truck.type.toLowerCase()) {
              this.sIndex = index;
            }
          });
        }
      } else {
        this.toastr.error('Error in fetching Truck Types', 'Error !');
      }
    });

  }

  showSection2() {
    if (isNullOrUndefined(this.truck.type)) {
      this.toastr.error('Please select the truck type');
    } else if (isNullOrUndefined(this.truck.name)) {
      this.toastr.error('Please enter the truck name');
    } else if (isNullOrUndefined(this.truck.registration)) {
      this.toastr.error('Please enter the registration');
    } else {
      this.section1 = false;
      this.section2 = true;
    }
  }

  setIndex(index: number, tr) {
    this.sIndex = index;
    this.truck.type = tr.key;
  }

  addTruck() {
    if (!(this.truck.latitude || this.truck.longitude)) {
      this.toastr.error('Please select location for your truck');
    } else {
      if (this.truck.id) {
        this.truckerService.update(this.truck).subscribe(data => {
          if (data.success) {
            this.toastr.success('Truck Updated Successfully', 'Success');
            this.router.navigate(['/trucks']);
          } else {
            this.toastr.error(data.error, 'Error!');
          }
        });
      } else {
        this.truckerService.create(this.truck).subscribe(data => {
          if (data.success) {
            this.toastr.success('Truck Added Successfully', 'Success');
            this.router.navigate(['/trucks']);
          }
        });
      }

    }
  }
}

