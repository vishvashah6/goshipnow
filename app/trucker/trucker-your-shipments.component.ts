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
  templateUrl: 'trucker-your-shipments.component.html'
})

export class TruckerYourShipmentsComponent implements OnInit {
  isCompleted = true;
  jobs = [];
  completedJobs = [];
  cancelledJobs = [];

  constructor(private router: Router,
              private truckerService: TruckerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.truckerService.jobHistory().subscribe(d => {
      if (d.success) {
        this.jobs = d.jobs;
        this.completedJobs = this.jobs.filter(j => j.status === 'delivered');
        this.cancelledJobs = this.jobs.filter(j => j.status === 'cancel-trucker');
      }
    });
  }

  completedShip() {
    this.isCompleted = true;
  }

  cancelledShip() {
    this.isCompleted = false;
  }
}
