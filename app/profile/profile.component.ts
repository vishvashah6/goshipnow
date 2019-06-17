import {Component, OnInit} from '@angular/core';
import {UserService, ConfigService} from '../_services/index';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
  isShipper = true;
  currentUser: any;
  user: any = [];
  loading = false;
  isLoaded = false;
  fileToUpload = null;
  base64textString = null;
  target = null;
  states = [];
  countries = [{'key': 'can', 'value': 'Canada'}, {'key': 'usa', 'value': 'United States'}];

  constructor(private router: Router,
              private userService: UserService,
              private configService: ConfigService,
              private toastr: ToastrService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.user.profile = {};
    this.userService.getById().subscribe(
      users => {
        this.user = users;
        if (this.user.profile.type === 'shipper') {
          this.isShipper = true;
        } else {
          this.isShipper = false;
        }
        this.isLoaded = true;
        this.fileToUpload = this.user.profile.image;
        this.configService.getStates(this.user.profile.country).subscribe(data => {
          if (data.success) {
            console.log(data);
            this.states = data.state;
          } else {
            this.toastr.error('Error in fetching states', 'Error !');
          }
        });
      });
  }

  updateProfile() {
    // delete this.user.profile.image;
    this.loading = true;
    this.userService.update(this.user.profile)
      .subscribe(
        data => {
          if (data.success) {
            this.loading = false;
            this.toastr.success('Profile Updated successful', 'Success');
          } else {
            this.loading = false;
            this.toastr.error(data.error, 'Error!');
          }
        },
        error => {
          this.toastr.error(error, 'Error!');
          this.loading = false;
        });
  }

  handleFileInput(files: FileList) {
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
    this.user.profile.image = this.base64textString;
    data.image = this.user.profile.image;
    this.userService.updateImage(data).subscribe(t => {
      if (t.success) {
        this.loading = false;
        this.toastr.success('Profile image uploaded successfully');
        this.user.profile.image = t.url + '?timeStamp=' + date;
      } else {
        this.loading = false;
        this.toastr.error('Error in uploading Image');
      }
    });
  }

  onOptionsSelected(value) {
    this.states = [];
    this.configService.getStates(value).subscribe(states => {
      this.states = states.state;
    });
  }
}
