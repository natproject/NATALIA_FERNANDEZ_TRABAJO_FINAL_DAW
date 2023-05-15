import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearPartidaComponent } from './form-crear-partida.component';

describe('FormCrearPartidaComponent', () => {
  let component: FormCrearPartidaComponent;
  let fixture: ComponentFixture<FormCrearPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearPartidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
