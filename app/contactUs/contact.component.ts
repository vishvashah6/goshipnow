import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent {
  contacts: any = {};

  constructor(private userService: UserService,
              private toastr: ToastrService) {
  }

  sendContactDetail() {
    this.userService.sendContacts(this.contacts).subscribe (
        data => {
          if (data.success) {
            this.contacts = '';
            this.toastr.success('Message Send Successfully', 'Success!');
          } else {
            this.contacts = '';
            this.toastr.error(data.error, 'Error!');
          }
        }
      );
  }
}
