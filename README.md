# Angular 18.2 hydration: orphaned SSR nodes ("ghost" list)

Minimal repro: server-rendered content of an `@if` branch stays in the DOM after hydration,
without being claimed by Angular (not clickable, still has the `ngh` attribute) and is never cleaned up.

## Run

```bash
npm install
npm start          # ng serve with SSR
```

Open the app and do a hard refresh. Ghost nodes are outlined with a red dashed border
(CSS rule `[ngh] { outline: 2px dashed red; }`).

## Setup

- `provideClientHydration(withEventReplay())`, zone.js
- One lazy route → `FaqComponent`
- `FaqStore.load()` returns data after `delay(1000)` (stand-in for an API call), no TransferState

```html
@if (!isLoader) {
  <h1>…</h1>
  @if (storeFAQ?.rows?.length) {
    <app-accordion>
      @for (faq of storeFAQ.rows; track faq.id) { <app-expansion>…</app-expansion> }
    </app-accordion>
  } @else { <div class="no-faq">…</div> }
} @else { skeleton }
```

## What happens on the client

1. **First render:** no data yet → inner `@if` takes `@else`. Angular only looks for dehydrated views in the
   `@else` container, so the server's list (dehydrated view in the `@if` branch container) is left in place,
   waiting for cleanup on app stable.
2. **`isLoader` becomes true:** the outer `@if` view is destroyed. Only claimed nodes are removed
   (`h1`, `br`, text, `.no-faq`). The dehydrated list is not owned by that view, so it stays in the DOM,
   and its LContainer is gone.
3. **On stable:** `cleanupDehydratedViews` walks the live view tree, the container no longer exists,
   so the list is never removed.
4. **Data arrives:** a new list is rendered after the orphan → 8 `app-expansion`, 4 of them dead.

## Workarounds

- `host: { ngSkipHydration: 'true' }` on the component
- Make the first client render match the server (TransferState for the data)
