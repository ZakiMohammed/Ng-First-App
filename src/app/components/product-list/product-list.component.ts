import { Component, OnInit } from '@angular/core';
import { Product, ProductData } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productData: ProductData;
  loader: boolean = false;
  _search: string = '';

  get search(): string {
    return this._search;
  }
  set search(value: string) {
    this._search = value;
    this.products = this.productData.searchProducts(this._search);
    // this.loader = true;
    // this.productService.searchProducts(this._search).subscribe(response => {
    //   this.products = response;
    //   this.loader = false;
    // });
  }

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private productService: ProductService) {
    this.productData = new ProductData();
    sharedService.getProductType().subscribe(type => {      
      if (type) {
        this.products = this.productData.getProducts().filter(i => i.typeId === +type.id);
      } else {
        this.products = [];
      }
    });
  }

  ngOnInit() {
    // this.productService.getProducts().subscribe(response => {
    //   this.products = response;
    //   this.loader = false;
    // });
    
    let auth = this.authService.getData();
    if (auth.type) {
      this.products = this.productData.getProducts().filter(i => i.typeId === +auth.type.id); 
    }
  }

  // onSearchChange($event: any) {
  //   let value = $event.target.value;
  //   this.search = value;
  //   this.products = this.productData.searchProducts(this._search);
  // }

  onRatingClick(nextSibling: any) {
    if (nextSibling.style.display === 'none') {
      nextSibling.style.display = 'block';
    } else {
      nextSibling.style.display = 'none';
    }
  }

}
