import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = environment.fakeApiUrl + 'posts/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getPosts() : Observable<Post[]> {
    return this.http.get(this.url, { headers: this.headers })
      .pipe(map(response => <Post[]>response));
  }

  getPost(id: number) : Observable<Post> {
    return this.http.get(this.url + id, { headers: this.headers })
      .pipe(map(response => <Post>response));
  }
  
}
