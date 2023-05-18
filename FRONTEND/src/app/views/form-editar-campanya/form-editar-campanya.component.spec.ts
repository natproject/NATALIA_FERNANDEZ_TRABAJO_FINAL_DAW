import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarCampanyaComponent } from './form-editar-campanya.component';

describe('FormEditarCampanyaComponent', () => {
  let component: FormEditarCampanyaComponent;
  let fixture: ComponentFixture<FormEditarCampanyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditarCampanyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarCampanyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
