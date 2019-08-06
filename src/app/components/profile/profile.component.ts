import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = null;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    let auth = this.authService.getData();
    this.userService.getUser(auth.user.id).subscribe(response => {
      
      this.user = new User();

      this.user.id = response.id;
      this.user.email = response.email;
      this.user.website = response.website;
      this.user.phone = response.phone;
      this.user.name = response.name;
      this.user.username = response.username;
      this.user.address = response.address;
      this.user.company = response.company;   
    });
  }

}
