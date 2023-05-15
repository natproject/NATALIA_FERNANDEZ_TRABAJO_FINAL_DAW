import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJuegosComponent } from './crear-juegos.component';

describe('CrearJuegosComponent', () => {
  let component: CrearJuegosComponent;
  let fixture: ComponentFixture<CrearJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearJuegosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
