import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Auth } from 'src/app/models/auth';
import { ProductType } from 'src/app/models/product';

declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = '';
  types: ProductType[] = [];
  type: ProductType = null;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private route: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    let data = this.authService.getData();
    if (data) {
      this.types = data.types;
      this.type = data.type;
      this.userName = data.user.username; 
    }

    this.sharedService.getAuth().subscribe(auth => {
      if (auth) {
        this.types = auth.types;
        this.type = auth.type;
      }
    });
  }

  onLogoutClick($event: any) {
    this.authService.clearData();
    // this.route.navigate(['/home']);
    window.location = 'home';
  }

  onTypeChange($event: any) {
    let type = this.types.find(i => i.id === +$event.target.value);
    let auth = this.authService.getData();

    auth.type = type;
    
    this.sharedService.setAuth(auth);    
  }

}
