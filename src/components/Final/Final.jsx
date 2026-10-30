import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useMobileVideo from "../../utils/useMobileVideo";

// The original H.264 clip has almost no keyframes. Seeking it on every scroll
// update forces the browser to repeatedly decode long stretches of video.
// These 24fps sprites are extracted from that clip and rendered on a canvas.
const FRAME_COUNT = 118;
const FRAME_WIDTH = 720;
const FRAME_HEIGHT = 405;
const COLUMNS = 5;
const FRAMES_PER_SHEET = 25;
const SHEET_COUNT = 5;

export default function Final() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  useMobileVideo(videoRef);
  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const media = gsap.matchMedia();

      media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
        const context = canvas.getContext("2d", { alpha: false });
        const playhead = { frame: 0 };
        let sheets = [];
        let loading = false;
        let disposed = false;
        let ready = false;
        let lastFrame = -1;
        let fallbackTime = -1;
        const images = [];

        const draw = (force = false) => {
          const frame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(playhead.frame)));
          if (!ready || !context) {
            // If sprite loading fails or is still in progress, keep the original
            // video as a scroll-controlled fallback instead of a blank section.
            if (Number.isFinite(video.duration) && video.duration > 0) {
              const time = frame / (FRAME_COUNT - 1) * Math.max(0, video.duration - 0.04);
              if (Math.abs(time - fallbackTime) >= 1 / 24 || force) {
                try { video.currentTime = time; fallbackTime = time; } catch { /* metadata not ready */ }
              }
            }
            return;
          }
          const rect = canvas.getBoundingClientRect();
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
          const width = Math.max(1, Math.round(rect.width * pixelRatio));
          const height = Math.max(1, Math.round(rect.height * pixelRatio));
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            force = true;
          }
          if (frame === lastFrame && !force) return;
          const index = frame % FRAMES_PER_SHEET;
          const scale = Math.max(width / FRAME_WIDTH, height / FRAME_HEIGHT);
          const drawWidth = FRAME_WIDTH * scale;
          const drawHeight = FRAME_HEIGHT * scale;
          context.drawImage(
            sheets[Math.floor(frame / FRAMES_PER_SHEET)],
            (index % COLUMNS) * FRAME_WIDTH, Math.floor(index / COLUMNS) * FRAME_HEIGHT,
            FRAME_WIDTH, FRAME_HEIGHT,
            (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight
          );
          canvas.dataset.frame = String(frame);
          lastFrame = frame;
        };

        const loadSheets = () => {
          if (loading || disposed || !context) return;
          loading = true;
          Promise.all(Array.from({ length: SHEET_COUNT }, (_, index) => new Promise((resolve, reject) => {
            const image = new Image();
            images.push(image);
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = `${import.meta.env.BASE_URL}assets/final-frames/sheet-${index + 1}.webp`;
          }))).then((loaded) => {
            if (disposed) return;
            sheets = loaded;
            ready = true;
            draw(true);
            canvas.classList.add("is-ready");
          }).catch(() => {
            // The original video remains visible and scroll-controlled.
          });
        };

        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            loadSheets();
            observer.disconnect();
          }
        }, { rootMargin: "200% 0px" });
        observer.observe(section);
        const resize = () => draw(true);
        window.addEventListener("resize", resize);
        const metadata = () => draw(true);
        video.addEventListener("loadedmetadata", metadata);
        video.pause();
        gsap.set(section, { marginTop: "-20dvh", opacity: 0 });
        gsap.to(section, {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 8, 6000)}`,
            scrub: 0.75,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        timeline.to(playhead, { frame: FRAME_COUNT - 1, duration: 1, ease: "none", onUpdate: () => draw() }, 0);
        timeline.to(section, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0.88);
        draw(true);
        return () => {
          disposed = true;
          observer.disconnect();
          window.removeEventListener("resize", resize);
          video.removeEventListener("loadedmetadata", metadata);
          canvas.classList.remove("is-ready");
          sheets = [];
          images.forEach((image) => { image.onload = null; image.onerror = null; image.src = ""; });
          canvas.width = 1;
          canvas.height = 1;
        };
      });
      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="final">
      <div className="final-content size-full">
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}assets/videos/last-vid-3.mp4`}
          muted
          playsInline
          preload="metadata"
          poster={`${import.meta.env.BASE_URL}assets/images/video-3-poster.webp`}
          aria-hidden="true"
          className="size-full object-cover"
        ></video>
        <canvas ref={canvasRef} className="final-frame-canvas" aria-hidden="true"></canvas>
      </div>
    </section>
  );
}
