import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../_services/index';
import {UserService} from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'forgot.component.html'
})

export class ForgetPasswordComponent {
  user: any = {};
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private toastr: ToastrService) {
  }

  sendMail() {
    this.userService.forgetPassword(this.user)
      . subscribe(
        data => {
          if (data.success) {
            this.toastr.success('Email Sent with instruction.', 'Success!');
            this.router.navigate(['/login']);
            }else {
            this.toastr.error(data.error, 'Error!');
            }
        },
        error => {
          this.toastr.error(error, 'Error!');
        });
  }
}
