import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreduzeceComponent } from './admin-preduzece.component';

describe('AdminPreduzeceComponent', () => {
  let component: AdminPreduzeceComponent;
  let fixture: ComponentFixture<AdminPreduzeceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreduzeceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreduzeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
