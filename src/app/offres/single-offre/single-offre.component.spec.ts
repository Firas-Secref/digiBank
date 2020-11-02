import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOffreComponent } from './single-offre.component';

describe('SingleOffreComponent', () => {
  let component: SingleOffreComponent;
  let fixture: ComponentFixture<SingleOffreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOffreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
