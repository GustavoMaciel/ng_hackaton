import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerPageComponent } from './amount-per-page.component';

describe('AmountPerPageComponent', () => {
  let component: AmountPerPageComponent;
  let fixture: ComponentFixture<AmountPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
