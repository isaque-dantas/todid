import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomGradientComponent } from './bottom-gradient.component';

describe('BottomGradientComponent', () => {
  let component: BottomGradientComponent;
  let fixture: ComponentFixture<BottomGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomGradientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
