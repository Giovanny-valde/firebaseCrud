import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitFuncionComponent } from './unit-funcion.component';

describe('UnitFuncionComponent', () => {
  let component: UnitFuncionComponent;
  let fixture: ComponentFixture<UnitFuncionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitFuncionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitFuncionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
