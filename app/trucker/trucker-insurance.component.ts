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
  templateUrl: 'trucker-insurance.component.html'
})

export class TruckerInsuranceComponent implements OnInit {
  insurance: any = {};
  fileToUpload;
  image;
  base64textString = null;
  target = null;
  loading;
  toggleInsurance;
  constructor(private router: Router,
              private userService: UserService,
              private truckerService: TruckerService,
              private toastr: ToastrService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.truckerService.getInsurance().subscribe( insu => {
      if (insu.success) {
        this.insurance = insu.insurance;
      } else {
        this.insurance = {};
      }
    });
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
    });
  }
  onUploadError(data) {
    console.log('data');
    alert('Error');
  }
  // handleFileInput(files) {
  //   const d: any = {};
  //   // d.image = files[0].dataURL.split(',')[1];
  //   // console.log(d);
  //   this.truckerService.updateInsurenceImage(d).subscribe(data1 => {
  //     console.log(data1);
  //   });
  // }

  handleFileInput(files) {
    this.loading = true;
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.fileToUpload);
  }

  _handleReaderLoaded(readerEvt) {
    const date = Date.now();
    const data: any = {};
    const binaryString = readerEvt.target.result;
    this.target = binaryString;
    this.base64textString = btoa(binaryString)
    this.insurance.image = this.base64textString;
    data.image = this.insurance.image;
    this.truckerService.updateInsurenceImage(data).subscribe(t => {
      if (t.success) {
        this.loading = false;
        this.toastr.success('Image uploaded successfully');
        this.insurance.image = t.url + '?timeStamp=' + date;
      } else {
        this.loading = false;
        this.toastr.error('Error in uploading Image');
      }
    });
  }


  //
  // _handleReaderLoaded(readerEvt) {
  //   const binaryString = readerEvt.target.result;
  //   const base64textString = btoa(binaryString);
  //   alert(base64textString);
  // }
}
