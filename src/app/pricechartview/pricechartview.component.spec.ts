import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricechartviewComponent } from './pricechartview.component';

describe('PricechartviewComponent', () => {
  let component: PricechartviewComponent;
  let fixture: ComponentFixture<PricechartviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricechartviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricechartviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
