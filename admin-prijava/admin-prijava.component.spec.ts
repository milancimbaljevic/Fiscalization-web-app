import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrijavaComponent } from './admin-prijava.component';

describe('AdminPrijavaComponent', () => {
  let component: AdminPrijavaComponent;
  let fixture: ComponentFixture<AdminPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
