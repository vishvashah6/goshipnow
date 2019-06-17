import {Component, OnInit} from '@angular/core';

import {AlertService} from '../_services/index';
import {UserService} from '../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services';


@Component({
  moduleId: module.id.toString(),
  selector: 'footerFront',
  templateUrl: 'footer.component.html'
})

export class FooterComponent implements OnInit {
  currentYear;
  constructor() {
  }
  ngOnInit(){
    this.currentYear = new Date().getUTCFullYear();
  }
}
