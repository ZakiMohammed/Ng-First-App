import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductData, Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})

export class ProductViewComponent implements OnInit {

  id: number = 0;
  product: Product = null;

  // DI: private route: ActivatedRoute
  constructor(private route: ActivatedRoute) { 
    let productData = new ProductData();

    this.id = this.route.snapshot.params.id;  
    this.product = productData.getProduct(+this.id);
  }

  ngOnInit() {    
    console.log(this.product);
  }
}
