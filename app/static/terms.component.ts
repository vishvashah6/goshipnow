import {Component, OnInit} from '@angular/core';
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'terms.component.html'
})

export class TermComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
