import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZahtjeviComponent } from './admin-zahtjevi.component';

describe('AdminZahtjeviComponent', () => {
  let component: AdminZahtjeviComponent;
  let fixture: ComponentFixture<AdminZahtjeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZahtjeviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZahtjeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
