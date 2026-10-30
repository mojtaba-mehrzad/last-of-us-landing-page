import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useMobileVideo from "../../utils/useMobileVideo";

export default function SecondVideo() {
  const videoRef = useRef();
  useMobileVideo(videoRef);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    gsap.set(".abby", { marginTop: "-60vh", opacity: 0 });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".abby",
        start: "top top",
        end: "120% top",
        scrub: true,
        pin: true,
        onEnterBack: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
          }
        },
        onEnter: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
          }
        },
      },
    });
    t1.to(".abby", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
    });
    return () => media.revert();
  }, []);
  return (
    <section className="abby">
      <div className="h-dvh">
        <video
          src={`${import.meta.env.BASE_URL}assets/videos/last-vid-2.mp4`}
          className="second-vd size-full object-cover md:[object-position:50%_center] [object-position:75%_center]"
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster={`${import.meta.env.BASE_URL}assets/images/video-2-poster.webp`}
          aria-hidden="true"
        ></video>
      </div>
    </section>
  );
}
