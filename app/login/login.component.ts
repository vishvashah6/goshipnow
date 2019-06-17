import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../_services/index';
import {UserService} from '../_services/user.service';
import {ToastrService} from 'ngx-toastr';
import {isNullOrUndefined} from "util";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isForget = false;
  user: any = {};
  currentUser: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // reset login status
    this.currentUser = JSON.parse(localStorage.getItem('userProfile'));
    if (!isNullOrUndefined(this.currentUser)) {
      if (this.currentUser.type === 'shipper') {
        this.router.navigate(['/shipping']);
      } else {
        this.router.navigate(['/find']);
      }
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (!data.success) {
            this.toastr.error(data.error, 'Error!');
            this.loading = false;
          } else {
            this.userService.getById().subscribe(
              users => {
                this.toastr.success('Login Successfully to your account!', 'Welcome!');
                this.user = users;
                localStorage.setItem('userProfile', JSON.stringify(this.user.profile));
                if (this.user.profile.type === 'shipper') {
                  this.router.navigate(['/shipping']);
                } else {
                  this.router.navigate(['/find']);
                }
              });
          }
        },
        error => {
          this.toastr.error(error, 'Error!');
          this.loading = false;
        });
  }

  forgetPass() {
    this.isForget = true;
  }

  loginAgain() {
    this.isForget = false;
  }

  sendMail() {
    this.userService.forgetPassword(this.user)
      .subscribe(
        data => {
          this.alertService.success('Email sent with instructions.');
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
