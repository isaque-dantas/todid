import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'app-bottom-gradient',
  standalone: true,
  imports: [],
  templateUrl: './bottom-gradient.component.html',
  styleUrl: './bottom-gradient.component.css'
})
export class BottomGradientComponent {
  @Input() parentElementId!: string
  resizeObserver = new ResizeObserver((entries) => {
      this.updatePosition()
    }
  )

  constructor(private elRef: ElementRef) {
  }

  get gradient() {
    return this.elRef.nativeElement.querySelector("div")
  }

  get parent(): Element {
    return document.getElementById(this.parentElementId)!
  }

  ngOnInit(): void {
    window.addEventListener("resize", this.updatePosition.bind(this))
    this.resizeObserver.observe(this.parent)
  }

  ngAfterContentInit() {
    setTimeout(this.updatePosition.bind(this), 50);
  }

  updatePosition(event?: UIEvent): void {
    const parent: HTMLElement = document.getElementById(this.parentElementId)!
    const parentRect: DOMRect = parent.getBoundingClientRect()

    this.gradient.style.top = `${parentRect.bottom - this.gradient.clientHeight}px`
    this.gradient.style.width =
      `${parent.clientWidth + parseInt(window.getComputedStyle(parent).marginLeft) + parseInt(window.getComputedStyle(parent).marginRight)}px`
  }
}
