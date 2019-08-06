import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Auth } from 'src/app/models/auth';

declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  auth: Auth = null;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private route: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.auth = this.authService.getData();
  }

  onLogoutClick($event: any) {
    this.authService.clearData();
    // this.route.navigate(['/home']);
    window.location = 'home';
  }

}
