import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCampanyaComponent } from './detalle-campanya.component';

describe('DetalleCampanyaComponent', () => {
  let component: DetalleCampanyaComponent;
  let fixture: ComponentFixture<DetalleCampanyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCampanyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCampanyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
