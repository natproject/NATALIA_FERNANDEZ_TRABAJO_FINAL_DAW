import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanyasComponent } from './campanyas.component';

describe('CampanyasComponent', () => {
  let component: CampanyasComponent;
  let fixture: ComponentFixture<CampanyasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanyasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanyasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
