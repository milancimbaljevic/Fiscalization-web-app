import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiRacuniComponent } from './moji-racuni.component';

describe('MojiRacuniComponent', () => {
  let component: MojiRacuniComponent;
  let fixture: ComponentFixture<MojiRacuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiRacuniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojiRacuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
