import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

// Only ease wheel scrolling on desktop. Touch, trackpads' horizontal gestures,
// keyboard navigation, browser zoom and nested scroll areas keep native behavior.
export default function useGentleScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(min-width: 1025px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let tween;
    let target = window.scrollY;

    function onWheel(event) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
      let node = event.target instanceof Element ? event.target : null;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1) return;
        node = node.parentElement;
      }
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      if (!tween) target = window.scrollY;
      target = Math.min(max, Math.max(0, target + delta * 0.72));
      event.preventDefault();
      tween?.kill();
      tween = gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: target, autoKill: true, onAutoKill: () => { target = window.scrollY; tween = null; } },
        ease: "power2.out",
        overwrite: true,
        onComplete: () => { target = window.scrollY; tween = null; },
      });
    }
    function interrupt() {
      tween?.kill();
      tween = null;
      target = window.scrollY;
    }
    function configure() {
      window.removeEventListener("wheel", onWheel);
      interrupt();
      if (preference.matches) window.addEventListener("wheel", onWheel, { passive: false });
    }
    configure();
    preference.addEventListener("change", configure);
    window.addEventListener("keydown", interrupt);
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    return () => {
      preference.removeEventListener("change", configure);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      interrupt();
    };
  }, []);
}
