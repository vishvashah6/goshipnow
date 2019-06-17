import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'privacy.component.html'
})

export class PrivacyComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
