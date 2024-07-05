import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeBreakpointService {
  breakpoints: { [breakpointName: string]: number } = {
    '2xl': 1536,
    xl: 1280,
    lg: 1024,
    md: 768,
    sm: 640,
  }

  currentBreakpoint!: string

  constructor() {
    this.currentBreakpoint = this.getBreakpoint()
  }

  getBreakpoint(): string {
    const screenWidth = window.screen.width
    return Object.keys(this.breakpoints).find(
      (breakpointName: string) => screenWidth > this.breakpoints[breakpointName]
    )!
  }

  isCurrentLargerThan(breakpoint: string): boolean {
    if (!(breakpoint in this.breakpoints))
      return false

    return this.breakpoints[this.currentBreakpoint] > this.breakpoints[breakpoint]
  }

  isCurrentThinnerThan(breakpoint: string): boolean {
    if (!(breakpoint in this.breakpoints))
      return false

    return this.breakpoints[this.currentBreakpoint] < this.breakpoints[breakpoint]
  }
}
