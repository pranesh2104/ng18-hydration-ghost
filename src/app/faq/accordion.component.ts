import { Component } from '@angular/core';

/** Like zen-accordion: just projects its content. */
@Component({
  selector: 'app-accordion',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class AccordionComponent {}
