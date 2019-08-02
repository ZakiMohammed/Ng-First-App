import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagerOption } from 'src/app/helpers/pagination';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

	clientOptions: PagerOption;

	constructor() {
		this.clientOptions = {
			size: 10,
			numbersCount: 5,
			orderBy: 'title',
			orderDir: 'ASC',
			url: environment.fakeApiUrl + 'todos/',
			visible: {
				order: true,
				pagination: true,
				search: true,
				status: true
			}
		};
	}

	ngOnInit() {
	}

}
