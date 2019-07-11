import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor() { 
    let productData = new ProductData();
    this.products = productData.getProducts();
  }

  ngOnInit() {
  }

}
