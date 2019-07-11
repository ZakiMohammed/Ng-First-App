import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];  
  productData: ProductData;
  search: string = '';

  constructor() { 
    this.productData = new ProductData();
    this.products = this.productData.getProducts();
  }

  ngOnInit() {
  }

  onSearchChange($event: any) {
    let value = $event.target.value;
    this.search = value;
    this.products = this.productData.searchProducts(this.search);
  }

}
