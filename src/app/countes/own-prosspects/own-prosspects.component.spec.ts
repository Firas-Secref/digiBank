import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnProsspectsComponent } from './own-prosspects.component';

describe('OwnProsspectsComponent', () => {
  let component: OwnProsspectsComponent;
  let fixture: ComponentFixture<OwnProsspectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnProsspectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnProsspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
