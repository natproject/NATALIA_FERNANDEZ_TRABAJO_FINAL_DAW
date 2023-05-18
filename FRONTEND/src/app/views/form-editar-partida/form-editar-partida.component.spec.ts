import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarPartidaComponent } from './form-editar-partida.component';

describe('FormEditarPartidaComponent', () => {
  let component: FormEditarPartidaComponent;
  let fixture: ComponentFixture<FormEditarPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditarPartidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditarPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
