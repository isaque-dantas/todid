import { TestBed } from '@angular/core/testing';

import { ScreenSizeBreakpointService } from './screen-size-breakpoint.service';

describe('ScreenSizeBreakpointService', () => {
  let service: ScreenSizeBreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenSizeBreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
