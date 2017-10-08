import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref,RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Directive, Injectable, Input  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PreferenceComponent } from './preference.component';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;
   let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
       FormsModule,
       ReactiveFormsModule
      ],
      declarations: [ PreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.mails'));
    el = de.nativeElement;

  });

  it('should be created', () => {
    const preference = fixture.debugElement.componentInstance;
    expect(preference).toBeTruthy();
  });
});
