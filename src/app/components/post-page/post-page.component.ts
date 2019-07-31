import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { Pagination } from 'src/app/helpers/pagination';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  pagination: Pagination;
  loader: boolean = false;

  constructor(private postService: PostService) { 
    this.pagination = new Pagination([], 0, 10, [], '', 'title', 'ASC');

    let callback = () => {
      this.getPosts(this.pagination.index, this.pagination.count, this.pagination.searchText, this.pagination.orderBy, this.pagination.orderDir);
    };

    this.pagination.nextCallBack = callback;
    this.pagination.previousCallBack = callback;
    this.pagination.firstCallBack = callback;
    this.pagination.lastCallBack = callback;
    this.pagination.currentCallBack = callback;
    this.pagination.searchCallBack = callback;
    
    this.pagination.orderCallBack = (by:string) => {            
      this.getPosts(this.pagination.index, this.pagination.count, this.pagination.searchText, by, this.pagination.orderDir);
    };
  }

  ngOnInit() {
    this.getPosts(this.pagination.index, this.pagination.count, this.pagination.searchText);
  }

  getPosts(index:number, size:number, search:string = "", orderBy:string = "title", orderDir:string = "ASC") {
    this.loader = true;
    this.postService.getPostPagination(index, size, search, orderBy, orderDir).subscribe(dto => {      
      this.pagination.list = dto.data;
      this.pagination.totalCount = dto.totalCount;
      this.pagination.filterCount = dto.filterCount;
      this.pagination.adjustNumbers();
      this.loader = false;
    });
  }

}
