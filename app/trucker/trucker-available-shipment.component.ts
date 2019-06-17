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
  templateUrl: 'trucker-available-shipment.component.html'
})

export class TruckerAvailableShipmentComponent implements OnInit {
  geolocationPosition;
  location: any = {};
  data;
  noJobs = true;
  public loading = true;

  constructor(private router: Router,
              private userService: UserService,
              private truckerService: TruckerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loading = true;
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
          console.log(this.location);
          this.truckerService.activeJob(this.location).subscribe(d => {
            if (d.success) {
              this.noJobs = false;
              if (!isNullOrUndefined(d.job)) {
                localStorage.setItem('detailShipment', JSON.stringify(d.job));
                this.loading = false;
                this.router.navigate(['/shipmentdetail']);
              }
            } else {
              this.truckerService.findJob(this.location).subscribe(jobs => {
                if (jobs.success) {
                  this.noJobs = false;
                  this.data = jobs.jobs;
                  if (this.data.length === 0) {
                    this.noJobs = true;
                  }
                  this.loading = false;
                } else {
                  this.loading = false;
                  this.noJobs = true;
                }
              });
            }
          });
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.loading = false;
              this.toastr.error('Location permission denied.', 'Error');
              break;
            case 2:
              console.log('Position Unavailable');
              this.loading = false;
              this.toastr.error('Location is not available.', 'Error');
              break;
            case 3:
              console.log('Timeout');
              this.loading = false;
              this.toastr.error('Timeout in fetching current position.', 'Error');
              break;
          }
        }
      );
    }
  }

  detailPage(item) {
    item.latitude = this.location.latitude;
    item.longitude = this.location.longitude;
    localStorage.setItem('detailShipment', JSON.stringify(item));
    this.router.navigate(['/shipmentdetail']);
  }

  acceptJob(item) {
    this.loading = true;
    const data = {
      shipmentId: item.shipmentId,
      latitude: this.location.latitude,
      longitude: this.location.longitude
    };

    this.truckerService.acceptJob(data).subscribe(d => {
      if (d.success) {
        this.loading = false;
        this.toastr.success('Job Accepted Successfully!!');
        this.router.navigate(['/find']);
      } else {
        this.loading = false;
        this.toastr.error(d.error, 'Error !');
      }
    });
  }
}
