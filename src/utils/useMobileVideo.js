import { useEffect } from "react";

// Decorative videos only play while visible on small screens. Reduced motion
// uses the poster and never starts playback.
export default function useMobileVideo(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const screen = window.matchMedia("(max-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    const configure = () => {
      observer?.disconnect();
      video.pause();
      video.loop = screen.matches && !reduced.matches;
      if (!screen.matches || reduced.matches) return;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      }, { threshold: 0.2 });
      observer.observe(video);
    };

    configure();
    screen.addEventListener("change", configure);
    reduced.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      video.pause();
      screen.removeEventListener("change", configure);
      reduced.removeEventListener("change", configure);
    };
  }, [videoRef]);
}
