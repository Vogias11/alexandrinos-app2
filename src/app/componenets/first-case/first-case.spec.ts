import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCase } from './first-case';

describe('FirstCase', () => {
  let component: FirstCase;
  let fixture: ComponentFixture<FirstCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstCase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
