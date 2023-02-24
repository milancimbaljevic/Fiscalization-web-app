import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacLozinkaComponent } from './kupac-lozinka.component';

describe('KupacLozinkaComponent', () => {
  let component: KupacLozinkaComponent;
  let fixture: ComponentFixture<KupacLozinkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KupacLozinkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacLozinkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
