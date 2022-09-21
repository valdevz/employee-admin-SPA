import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapSeachbar } from './googleMap-searchbar';

describe('GoogleMapSeachbar', () => {
  let component: GoogleMapSeachbar;
  let fixture: ComponentFixture<GoogleMapSeachbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapSeachbar ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapSeachbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
