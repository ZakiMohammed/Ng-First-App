import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { 
    // let productData = new ProductData();
    // this.products = productData.getProducts();
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      this.products = response;
    });
  }

}
