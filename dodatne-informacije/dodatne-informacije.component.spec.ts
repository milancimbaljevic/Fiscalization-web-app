import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodatneInformacijeComponent } from './dodatne-informacije.component';

describe('DodatneInformacijeComponent', () => {
  let component: DodatneInformacijeComponent;
  let fixture: ComponentFixture<DodatneInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodatneInformacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodatneInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
