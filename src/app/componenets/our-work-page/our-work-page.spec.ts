import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWorkPage } from './our-work-page';

describe('OurWorkPage', () => {
  let component: OurWorkPage;
  let fixture: ComponentFixture<OurWorkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurWorkPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurWorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
