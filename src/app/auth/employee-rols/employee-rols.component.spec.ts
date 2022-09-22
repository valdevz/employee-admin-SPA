import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRolsComponent } from './employee-rols.component';

describe('EmployeeRolsComponent', () => {
  let component: EmployeeRolsComponent;
  let fixture: ComponentFixture<EmployeeRolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeRolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
