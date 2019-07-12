import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = environment.apiUrl + 'product/';
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  getProducts() : Observable<Product[]> {
    return this.http.get(this.url + 'get-all.php', { headers: this.headers })
      .pipe(map(response => <Product[]>response));
  }

  getProduct(id: number) : Observable<Product> {
    return this.http.get(this.url + 'get-single.php?id=' + id, { headers: this.headers })
      .pipe(map(response => <Product>response));
  }

  searchProducts(value: string) : Observable<Product[]> {
    return this.http.get(this.url + 'search.php?value=' + encodeURI(value), { headers: this.headers })
      .pipe(map(response => <Product[]>response));
  }
}
