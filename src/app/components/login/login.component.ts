import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductData } from 'src/app/models/product';
import { SharedService } from 'src/app/services/shared.service';

declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frm: FormGroup;
  message: string = '';
  loader: boolean = false;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedService,
    private route: Router
    ) { }

  get f() {
    return this.frm.controls;
  }

  ngOnInit() {
    this.frm = this.builder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.frm.valid) {

      let userName = this.frm.value.userName;
      let email = this.frm.value.email;      

      this.message = '';
      this.loader = true;

      this.userService.getUsers().subscribe(users => {
        let user = users.find(i => i.email === email && i.username === userName);
        if (user) {
          this.authService.setData({
            user: user,
            types: new ProductData().getProductTypes()
          });          
          // this.route.navigateByUrl('/home');
          window.location = 'home';
        } else {
          this.message = 'Invalid credentials';
        }
      }, (error) => {
        this.message = 'Something went wrong';
      }, () => {
        this.loader = false;
      });

    }
  }

}
