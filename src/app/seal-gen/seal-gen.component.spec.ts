import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SealGenComponent } from './seal-gen.component';

describe('SealGenComponent', () => {
  let component: SealGenComponent;
  let fixture: ComponentFixture<SealGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SealGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SealGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
