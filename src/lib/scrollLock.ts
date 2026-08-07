// Ref-counted scroll lock shared by every overlay (modal, palette, mobile menu)
// so closing one overlay never unlocks scroll while another is still open.
// Also pauses Lenis so wheel/touch momentum cannot scroll the page behind.

let count = 0;

interface LenisLike {
  stop: () => void;
  start: () => void;
}

const lenis = () =>
  (window as unknown as { __lenis?: LenisLike }).__lenis;

export function lockScroll() {
  count += 1;
  if (count === 1) {
    document.documentElement.style.overflow = "hidden";
    lenis()?.stop();
  }
}

export function unlockScroll() {
  count = Math.max(0, count - 1);
  if (count === 0) {
    document.documentElement.style.overflow = "";
    lenis()?.start();
  }
}
