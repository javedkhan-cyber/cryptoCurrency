import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonviewComponent } from './comparisonview.component';

describe('ComparisonviewComponent', () => {
  let component: ComparisonviewComponent;
  let fixture: ComponentFixture<ComparisonviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
