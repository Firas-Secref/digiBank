import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffresDialogComponent } from './add-offres-dialog.component';

describe('AddOffresDialogComponent', () => {
  let component: AddOffresDialogComponent;
  let fixture: ComponentFixture<AddOffresDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOffresDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOffresDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
