import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearCampanyaComponent } from './form-crear-campanya.component';

describe('FormCrearCampanyaComponent', () => {
  let component: FormCrearCampanyaComponent;
  let fixture: ComponentFixture<FormCrearCampanyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearCampanyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearCampanyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
