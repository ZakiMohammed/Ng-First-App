import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor() { 
    let productData = new ProductData();
    this.products = productData.getProducts();
  }

  ngOnInit() {
  }

}
