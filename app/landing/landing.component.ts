import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../_services/index';
import {UserService} from '../_services/user.service';
import {ToastrService} from "ngx-toastr";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'landing.component.html'
})

export class LandingPageComponent {
  user: any = {};

  constructor(private userService: UserService,
              private toastr: ToastrService) {
  }

  subscribeMail() {
    this.userService.subscibe(this.user).subscribe(
      res => {
        if (res.success) {
          this.toastr.success('You have successfully subscribed to our newsletter', 'Yep!');
        }

      });
  }
}
