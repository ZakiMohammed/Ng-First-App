import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductType } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private name: BehaviorSubject<string> = new BehaviorSubject(null);
  private productType: BehaviorSubject<ProductType> = new BehaviorSubject(null);
  private productTypes: BehaviorSubject<ProductType[]> = new BehaviorSubject(null);

  constructor(private authService: AuthService) {
    let auth = authService.getData();
    
    if (auth) {
      this.name = new BehaviorSubject(auth.user.name);
      this.productType = new BehaviorSubject(auth.type);
      this.productTypes = new BehaviorSubject(auth.types);
    }
  }

  getName(): Observable<string> {
    return this.name.asObservable();
  }
  setName(value: string) {
    this.name.next(value);
  }

  getProductType(): Observable<ProductType> {
    return this.productType.asObservable();
  }
  setProductType(value: ProductType) {
    this.productType.next(value);
  }

  getProductTypes(): Observable<ProductType[]> {
    return this.productTypes.asObservable();
  }
  setProductTypes(value: ProductType[]) {
    this.productTypes.next(value);
  }
}
