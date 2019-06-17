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
  templateUrl: 'trucker-setting.component.html'
})

export class TruckerSettingComponent implements OnInit {
  insurance: any = {};
  licence: any = {};
  isEditInusurence = false;
  isEditLicence = false;
  constructor(private router: Router,
              private truckerService: TruckerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.truckerService.getInsurance().subscribe( insu => {
      this.insurance = insu.insurance;
    });

    this.truckerService.getLicence().subscribe( lic => {
      this.licence = lic.license;
    });
  }

  toggleInsurance() {
    this.isEditInusurence = !this.isEditInusurence;
  }
  updateInsurance() {
    if (!isNumber(this.insurance.startDate)) {
      this.insurance.startDate = new Date(this.insurance.startDate).getTime() / 1000;
    }
    if (!isNumber(this.insurance.expireDate)) {
      this.insurance.expireDate = new Date(this.insurance.expireDate).getTime() / 1000;
    }
    this.truckerService.updateInsurance(this.insurance).subscribe( insu => {
      this.toastr.success('Data updated successfully!', 'Success!');
      this.isEditInusurence = false;
    });
  }

  togglelicence() {
    this.isEditLicence = !this.isEditLicence;
  }
  updatelicence() {
    if (!isNumber(this.licence.issueDate)) {
      this.licence.issueDate = new Date(this.licence.issueDate).getTime() / 1000;
    }
    if (!isNumber(this.licence.expireDate)) {
      this.licence.expireDate = new Date(this.licence.expireDate).getTime() / 1000;
    }
    this.truckerService.updateLicence(this.licence).subscribe( insu => {
      this.toastr.success('Data updated successfully!', 'Success!');
      this.isEditLicence = false;
    });
  }
}
