import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {ToastrService} from 'ngx-toastr';
import {UserService, TruckerService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import {isNumber} from 'util';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'trucker-licence.component.html'
})

export class TruckerLicenceComponent implements OnInit {
  licence: any = {};
  config;
  togglelicence;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private router: Router,
              private userService: UserService,
              private truckerService: TruckerService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.truckerService.getLicence().subscribe(lic => {
      if (lic.success) {
        this.licence = lic.license;
      } else {
        this.licence = {};
      }
    });
  }

  updatelicence() {
    if (!isNumber(this.licence.issueDate)) {
      this.licence.issueDate = new Date(this.licence.issueDate).getTime() / 1000;
    }
    if (!isNumber(this.licence.expireDate)) {
      this.licence.expireDate = new Date(this.licence.expireDate).getTime() / 1000;
    }
    this.truckerService.updateLicence(this.licence).subscribe(insu => {
      this.toastr.success('Data updated successfully!', 'Success!');
    });
  }

  onUploadError(data) {
    console.log('data');
    alert('Error');
  }

  onUploadSuccess(data) {
    // console.log(data[0].dataURL);
    const d: any = {};
    d.image = data[0].dataURL.split(',')[1];
    console.log(d);
    this.truckerService.updateInsurenceImage(d).subscribe(data1 => {
      console.log(data1);
    });
  }

}
