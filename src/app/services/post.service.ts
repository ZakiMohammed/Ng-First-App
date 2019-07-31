import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Helper } from '../helpers/helper';

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

  getPostPagination(index:number, size:number, search:string = '', orderBy:string = 'title', orderDir:string = 'DESC') : Observable<any> {
    return this.http.get(this.url, { headers: this.headers })
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
      }));
  }

  getPost(id: number) : Observable<Post> {
    return this.http.get(this.url + id, { headers: this.headers })
      .pipe(map(response => <Post>response));
  }
  
}
