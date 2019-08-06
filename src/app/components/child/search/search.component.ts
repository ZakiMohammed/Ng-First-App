import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input('list') list: any[] = [];
	@Input('value') value: string = 'id';
	@Input('text') text: string = 'name';
	@Input('isObject') isObject: boolean = true;

	@Output('itemClick') itemClick: EventEmitter<any> = new EventEmitter<any>(null);	

  hideSearchBox: boolean = true;
	listFiltered: any[] = [];

	_item: any = null;
	_searchText: string = '';

	get item(): any {
		return this._item;
	}
	set item(value: any) {
		this._item = value;
	}
	get searchText(): string {
		return this._searchText;
	}
	set searchText(value: string) {
		this._searchText = value;
		if (!this._searchText) {
			this.listFiltered = this.list.concat();
			return;
		}
		this.listFiltered = this.list.filter(i => (this.isObject ? i[this.text] : i).toLowerCase().indexOf(this._searchText.toLowerCase()) !== -1).concat();
	}
	
	getValue(item: any): any {
		return this.isObject ? item[this.value] : item;
	}
	getText(item: any): any {
		return this.isObject ? item[this.text] : item;
	}

	constructor() {
	}

	ngOnInit() {
		this.listFiltered = this.list.concat();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.list = changes.list.currentValue;
		this.listFiltered = this.list.concat();
	}

	onItemClick($event: any, item: any) {
    this.hideSearchBox = true;
		this.item = item;
		this.itemClick.emit({
			$event: $event,
			item: this.item
		});
	}

}
