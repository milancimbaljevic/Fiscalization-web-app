import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledIzvjestajaComponent } from './pregled-izvjestaja.component';

describe('PregledIzvjestajaComponent', () => {
  let component: PregledIzvjestajaComponent;
  let fixture: ComponentFixture<PregledIzvjestajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledIzvjestajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledIzvjestajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
