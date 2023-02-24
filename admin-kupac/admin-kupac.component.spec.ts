import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKupacComponent } from './admin-kupac.component';

describe('AdminKupacComponent', () => {
  let component: AdminKupacComponent;
  let fixture: ComponentFixture<AdminKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKupacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
