import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLozinkaComponent } from './admin-lozinka.component';

describe('AdminLozinkaComponent', () => {
  let component: AdminLozinkaComponent;
  let fixture: ComponentFixture<AdminLozinkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLozinkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLozinkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
