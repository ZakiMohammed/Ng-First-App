import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];    
  loader: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loader = true;
    this.postService.getPosts().subscribe(response => {
      this.posts = response;
      this.loader = false;
    });
  }

}
