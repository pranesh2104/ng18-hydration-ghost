import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface FaqState {
  isLoading?: boolean;
  rows?: Faq[];
}

const FAQS: Faq[] = [
  { id: 1, question: 'How can I place an order?', answer: 'Add items to the cart and check out.' },
  { id: 2, question: 'What payment methods are accepted?', answer: 'Cards, UPI and cash on delivery.' },
  { id: 3, question: 'Can I return or exchange a product?', answer: 'Yes, within 7 days.' },
  { id: 4, question: 'How do I track my order?', answer: 'Use the link in your order email.' },
];

/** Works like FooterStore: starts empty, then loads with a delay (a stand-in for the API call). */
@Injectable({ providedIn: 'root' })
export class FaqStore {
  readonly state = signal<FaqState>({});

  load(): void {
    this.state.set({ ...this.state(), isLoading: true });
    of(FAQS)
      .pipe(delay(1000))
      .subscribe((rows) => this.state.set({ isLoading: false, rows }));
  }
}
