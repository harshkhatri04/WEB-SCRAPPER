import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NasdaqComponent } from './nasdaq.component';

describe('NasdaqComponent', () => {
  let component: NasdaqComponent;
  let fixture: ComponentFixture<NasdaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NasdaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NasdaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
