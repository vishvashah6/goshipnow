import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AlertService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'homeT.component.html'
})

export class HomeTComponent implements OnInit {
    currentUser: any;
    users: any = [];
    constructor(private userService: UserService , private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }
    private loadAllUsers() {
        this.users.profile = null;
        this.userService.getById().subscribe(users => { this.users = users; });
    }
}
