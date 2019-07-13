import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  id: number = 0;
  post: Post = null;
  user: User = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService) { 
      this.id = this.route.snapshot.params.id;
    }

  ngOnInit() {
    this.postService.getPost(+this.id).subscribe(response => {
      this.post = response;
      this.userService.getUser(this.post.userId).subscribe(response => {
        this.user = response;
      });
    });
  }

}
