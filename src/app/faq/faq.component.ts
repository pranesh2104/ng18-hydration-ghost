import { Component, effect, inject } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { ExpansionComponent } from './expansion.component';
import { FaqState, FaqStore } from './faq.store';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [AccordionComponent, ExpansionComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  // Fix 1: uncomment to skip hydration for this component (no ghost, but the loader shows first).
  // host: { ngSkipHydration: 'true' },
})
export class FaqComponent {
  private readonly faqStore = inject(FaqStore);

  storeFAQ?: FaqState;
  isLoader = false;

  constructor() {
    // Same pattern as zb-storefront's FaqComponent.
    effect(() => {
      const faqData = this.faqStore.state();
      this.isLoader = !!faqData.isLoading;
      if (faqData.rows) this.storeFAQ = faqData;
    });
  }

  ngOnInit(): void {
    this.faqStore.load();
  }

  clicked(index: number): void {
    console.log('clicked FAQ', index);
  }
}
