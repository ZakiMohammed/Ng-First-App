import { Component, OnInit, Input } from '@angular/core';
import { Pagination, PagerOption } from 'src/app/helpers/pagination';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Helper } from 'src/app/helpers/helper';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  @Input('options')
  pagerOption: PagerOption;

  pagination: Pagination;
  loader: boolean = false;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {    
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  ngOnInit() {
    this.pagination = new Pagination([], 0, this.pagerOption.size, [], '', this.pagerOption.orderBy, this.pagerOption.orderDir, this.pagerOption.numbersCount);

    let callback = () => {
      this.getList(this.pagination.index, this.pagination.count, this.pagination.searchText, this.pagination.orderBy, this.pagination.orderDir);
    };

    this.pagination.nextCallBack = callback;
    this.pagination.previousCallBack = callback;
    this.pagination.firstCallBack = callback;
    this.pagination.lastCallBack = callback;
    this.pagination.currentCallBack = callback;
    this.pagination.searchCallBack = callback;

    this.pagination.orderCallBack = (by: string) => {
      this.getList(this.pagination.index, this.pagination.count, this.pagination.searchText, by, this.pagination.orderDir);
    };

    callback();
  }

  getList(index: number, size: number, search: string, orderBy: string, orderDir: string) {
    this.loader = true;
    this.http.get(this.pagerOption.url, { headers: this.headers })
      .pipe(map(response => {

        let products = <Post[]>response;
        let totalCount = products.length;
        let filterCount = 0;

        if (search) {
          products = products.filter(i => i.title.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        }

        products = products.sort((a, b) => Helper.order<Post>(a, b, orderBy, orderDir === 'DESC'));

        filterCount = products.length;

        products = products.slice(index, index + size);

        return {
          data: products,
          filterCount: filterCount,
          totalCount: totalCount
        };
      }))
      .subscribe(dto => {
        this.pagination.list = dto.data;
        this.pagination.totalCount = dto.totalCount;
        this.pagination.filterCount = dto.filterCount;
        this.pagination.adjustNumbers();
        this.loader = false;
      });
  }

}
