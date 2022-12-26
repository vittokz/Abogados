import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContratosComponent } from './main-contratos.component';

describe('MainContratosComponent', () => {
  let component: MainContratosComponent;
  let fixture: ComponentFixture<MainContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
