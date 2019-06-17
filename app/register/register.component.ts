import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService, ConfigService} from '../_services/index';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
  model: any = {};
  shipRegister = true;
  truckRegister = false;
  reg = 'shipper';
  states = [];
  shipperCheck = false;
  truckerCheck = false;
  fileToUpload: File = null;
  countries = [{'key': 'can', 'value': 'Canada'}, {'key': 'usa', 'value': 'United States'}];
  private base64textString: String = '';

  constructor(private router: Router,
              private userService: UserService,
              private configService: ConfigService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.model.country = 'usa';
    this.configService.getStates(this.model.country).subscribe(data => {
      if (data.success) {
        console.log(data);
        this.states = data.state;
      } else {
        this.toastr.error('Error in fetching states', 'Error !');
      }
    });
  }

  register() {
    if (this.reg === 'shipper') {
      if (!this.shipperCheck) {
        this.toastr.error('Please review and accept the terms & conditions by clicking the checkbox.');
      } else {
        this.model.type = this.reg;
        this.userService.create(this.model)
          .subscribe(
            data => {
              if (data.success) {
                this.toastr.success('Registration successful', 'Success!');
                this.router.navigate(['/login']);
              } else {
                this.toastr.error(data.error, 'Error!');
              }
            },
            error => {
              this.toastr.error(error, 'Error!');
            });
      }
    }
    if (this.reg === 'trucker') {
      if (!this.truckerCheck) {
        this.toastr.error('Please review and accept the terms & conditions by clicking the checkbox.');
      } else {
        this.model.type = this.reg;
        this.userService.create(this.model)
          .subscribe(
            data => {
              if (data.success) {
                this.toastr.success('Registration successful', 'Success!');
                this.router.navigate(['/login']);
              } else {
                this.toastr.error(data.error, 'Error!');
              }
            },
            error => {
              this.toastr.error(error, 'Error!');
            });
      }
    }
  }

  shipperRegistration() {
    this.reg = 'shipper';
    this.shipRegister = true;
    this.truckRegister = false;
  }

  isRegistration() {
    if (this.shipRegister || this.truckRegister) {
      return false;
    } else {
      return true;
    }
  }

  truckRegistration() {
    this.reg = 'trucker';
    this.truckRegister = true;
    this.shipRegister = false;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.fileToUpload);
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.model.image = this.base64textString;
  }

  onOptionsSelected(value) {
    this.states = [];
    this.configService.getStates(value).subscribe(states => {
      this.states = states.state;
    });
  }
}
