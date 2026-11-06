import { Component, Input } from '@angular/core';

/** Like zen-expansion: a clickable header and a collapsible body. */
@Component({
  selector: 'app-expansion',
  standalone: true,
  template: `
    <div class="header" (click)="expand = !expand">
      <ng-content select="[panel-header]"></ng-content>
    </div>
    @if (expand) {
      <div class="body"><ng-content select="[panel-description]"></ng-content></div>
    }
  `,
  styles: `
    :host { display: block; border: 1px solid #ccc; border-radius: 6px; margin: 6px 0; }
    .header { padding: 10px; cursor: pointer; font-weight: 600; }
    .body { padding: 0 10px 10px; }
  `,
})
export class ExpansionComponent {
  @Input() expand = false;
}
