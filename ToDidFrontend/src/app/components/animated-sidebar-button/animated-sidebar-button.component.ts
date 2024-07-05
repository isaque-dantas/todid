import {Component, ElementRef, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-animated-sidebar-button',
  standalone: true,
  imports: [],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          transform: 'rotateZ(-180deg)'
        })
      ),
      state(
        'closed',
        style({
          transform: 'rotateZ(0deg)'
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')])
    ])
  ],
  templateUrl: './animated-sidebar-button.component.html',
  styleUrl: './animated-sidebar-button.component.css'
})
export class AnimatedSidebarButtonComponent {
  @Input() anchorElementData!: { side: 'right' | 'left', selector: string }

  constructor(public sidebarService: SidebarService, private elRef: ElementRef) {
  }

  get anchor(): HTMLElement | null {
    return document.querySelector(this.anchorElementData.selector)
  }

  ngOnInit() {
    document.addEventListener("resize", this.updatePosition.bind(this))
    this.anchor?.addEventListener("resize", this.updatePosition.bind(this))
  }

  ngAfterContentInit(): void {
    this.updatePosition()
  }

  updatePosition() {
    let anchorHorizontalPosition: number = 0

    if (this.anchor) {
      const anchorRect: DOMRect = this.anchor.getBoundingClientRect()
      const anchorClient: CSSStyleDeclaration = window.getComputedStyle(this.anchor)
      anchorHorizontalPosition += this.anchorElementData.side == 'right' ? anchorRect.right : anchorRect.left
      anchorHorizontalPosition -=
        parseInt(anchorClient.marginLeft) +
        parseInt(anchorClient.marginRight) +
        parseInt(anchorClient.paddingLeft) +
        parseInt(anchorClient.paddingRight)
    }
    // this.elRef.nativeElement.style[this.anchorElementData.side] = anchorHorizontalPosition
  }

  handleClick() {
    if (this.sidebarService.isOpen) {
      this.sidebarService.close()
    } else {
      this.sidebarService.open()
    }
  }
}
