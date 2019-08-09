import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductType } from 'src/app/models/product';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {

  frm: FormGroup;    
  action: string = 'v';  
  list: ProductType[] = [];

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  get f() {
    return this.frm.controls;
  }

  ngOnInit() {
    this.frm = this.builder.group({
      name: [name, [Validators.required, Validators.minLength(3)]]
    });

    this.list = this.authService.getData().types;

    this.sharedService.getAuth().subscribe(auth => {
      this.list = auth.types;
    });
  }

  onSubmit($event: any) {
    if (this.frm.valid) {

      let auth = this.authService.getData();
      let newId = auth.types.length ? Math.max.apply(0, auth.types.map(i => i.id)) : 0;
      let newType = new ProductType(newId + 1, this.f.name.value);

      auth.types.push(newType);

      if (auth.types.length == 0) {
        auth.type = newType;        
      }
      
      this.sharedService.setAuth(auth);

      this.action = 'v';

      this.frm.reset();
    }
  }

  onRemoveClick($event: any, item: ProductType, index: number) {
    let auth = this.authService.getData();
    if (auth.types.length > 1) {
      auth.types.splice(index, 1);
    } else {
      auth.types.splice(index, 1);
      auth.type = null;
    }
    this.sharedService.setAuth(auth);
  }

}
