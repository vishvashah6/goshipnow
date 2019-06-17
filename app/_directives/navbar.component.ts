import {Component, OnInit} from '@angular/core';

import {AlertService} from '../_services/index';
import {UserService} from "../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services";


@Component({
  moduleId: module.id.toString(),
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})

export class NavBarComponent implements OnInit {
  user: any = {};

  constructor(private alertService: AlertService,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.userService.getById().subscribe(data => {
      if (data.success) {
        this.user = data.profile;
      }
    });
  }
}
