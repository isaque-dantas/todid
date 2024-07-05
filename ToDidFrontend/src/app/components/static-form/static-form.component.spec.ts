import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticFormComponent } from './static-form.component';

describe('DynamicFormComponent', () => {
  let component: StaticFormComponent;
  let fixture: ComponentFixture<StaticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
