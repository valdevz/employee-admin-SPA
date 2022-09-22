import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbsComponent } from './suburbs.component';

describe('SuburbsComponent', () => {
  let component: SuburbsComponent;
  let fixture: ComponentFixture<SuburbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuburbsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuburbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
