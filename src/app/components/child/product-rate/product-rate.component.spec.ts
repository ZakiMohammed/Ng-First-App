import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRateComponent } from './product-rate.component';

describe('ProductRateComponent', () => {
  let component: ProductRateComponent;
  let fixture: ComponentFixture<ProductRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
