import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];  
  productData: ProductData;
  loader: boolean = true;
  _search: string = '';

  get search() : string {
    return this._search;
  }
  set search(value : string) {
    this._search = value;
    // this.products = this.productData.searchProducts(this._search);
    this.loader = true;
    this.productService.searchProducts(this._search).subscribe(response => {
      this.products = response;
      this.loader = false;
    });
  }
  
  constructor(private productService: ProductService) { 
    // this.productData = new ProductData();
    // this.products = this.productData.getProducts();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
      this.loader = false;
    });
  }

  // onSearchChange($event: any) {
  //   let value = $event.target.value;
  //   this.search = value;
  //   this.products = this.productData.searchProducts(this._search);
  // }

}
