// StackBlitz's Node defines DOMException as getter-only, which breaks Angular's
// server shims (Object.assign(globalThis, domino.impl)). Make it writable first.
try {
  const desc = Object.getOwnPropertyDescriptor(globalThis, 'DOMException');
  if (desc && !('value' in desc) && !desc.set) {
    Object.defineProperty(globalThis, 'DOMException', {
      value: globalThis.DOMException,
      writable: true,
      configurable: true,
      enumerable: desc.enumerable,
    });
  }
} catch {
  // Not configurable: leave it, Angular will report the original error.
}
