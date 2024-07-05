import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedSidebarButtonComponent } from './animated-sidebar-button.component';

describe('AnimatedSidebarButtonComponent', () => {
  let component: AnimatedSidebarButtonComponent;
  let fixture: ComponentFixture<AnimatedSidebarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedSidebarButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedSidebarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
