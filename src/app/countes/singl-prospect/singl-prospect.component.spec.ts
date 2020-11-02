import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglProspectComponent } from './singl-prospect.component';

describe('SinglProspectComponent', () => {
  let component: SinglProspectComponent;
  let fixture: ComponentFixture<SinglProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
