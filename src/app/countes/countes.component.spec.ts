import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountesComponent } from './countes.component';

describe('CountesComponent', () => {
  let component: CountesComponent;
  let fixture: ComponentFixture<CountesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
