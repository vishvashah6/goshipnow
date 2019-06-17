import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'about.component.html'
})

export class AboutPageComponent implements OnInit {

  constructor(private router: Router) {
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
