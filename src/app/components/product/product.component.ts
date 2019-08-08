import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private productService: ProductService) { 
    // let productData = new ProductData();
    // this.products = productData.getProducts();
    sharedService.getProductType().subscribe(type => {
      this.productService.getProducts().subscribe(response => {
        this.products = response.filter(i => i.typeId === type.id);
      });
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(response => {
      let auth = this.authService.getData();
      this.products = response.filter(i => i.typeId === auth.type.id);
    });
  }

}
