import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountesListComponent } from './countes-list.component';

describe('CountesListComponent', () => {
  let component: CountesListComponent;
  let fixture: ComponentFixture<CountesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
