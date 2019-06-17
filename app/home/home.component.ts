import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';
import { ToastrService } from 'ngx-toastr';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: any;
    users: any = [];
    constructor(private userService: UserService , private toastr: ToastrService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }
    private loadAllUsers() {
        this.users.profile = null;
        this.userService.getById().subscribe(users => { this.users = users; });
        console.log(this.users);
    }
}
