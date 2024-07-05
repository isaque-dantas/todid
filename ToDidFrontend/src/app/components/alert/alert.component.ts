import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertData} from "../../interfaces/alert-data";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  @Input() data!: AlertData
  @Output() dismissedAlert = new EventEmitter<void>()
  accentColor!: string
  sanitizedMessage!: SafeHtml;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  sanitizeMessage(): void {
    this.sanitizedMessage = this.sanitizer.bypassSecurityTrustHtml(this.data.message)
  }

  ngOnInit(): void {
    const colorsDict = {
      success: "green-800",
      warning: "yellow-800",
      error: "red-800",
      info: "indigo-800",
    }

    this.accentColor = colorsDict[this.data.type]
    this.sanitizeMessage();
  }

  dismiss(): void {
    this.dismissedAlert.emit()
  }

  handleAnchorClick(event: MouseEvent): void {
    const target = event.target as HTMLAnchorElement;
    const routerLink = target.getAttribute('routerLink');

    if (routerLink && routerLink.startsWith('/')) {
      event.preventDefault();
      this.router.navigateByUrl(routerLink);
    }
  }
}
