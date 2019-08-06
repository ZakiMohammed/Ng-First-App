import { Component, OnInit } from '@angular/core';
import { ProductData } from 'src/app/models/product';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-view',
	templateUrl: './user-view.component.html',
	styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

	list: any[] = [];
	item: any = null;

	constructor(private userService: UserService) { 
		// this.list = new ProductData().getProducts();		
	}

	ngOnInit() {
		this.userService.getUsers().subscribe(users => this.list = users);
	}

	onItemClick($event: any) {
		console.log($event);
		this.item = $event.item;
	}

}
