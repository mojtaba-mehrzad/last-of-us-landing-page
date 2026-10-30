import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import useMobileVideo from "../../utils/useMobileVideo";

export default function FirstVideo() {
  const videoRef = useRef();
  useMobileVideo(videoRef);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    gsap.set(".first-vd-wrapper", {
      marginTop: "-150vh",
      opacity: 0,
    });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=180% top",
        scrub: true,
        pin: true,
        delay: 1,
        onEnterBack:()=>{
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(() => {});
        }
      },
    });
    t1.to(".hero-section", {
      opacity: 0,
      ease: "power1.inOut",
      onComplete: () => {
        videoRef.current.play().catch(() => {});
      },
    }).to(".first-vd-wrapper", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
    });
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Native touch scrolling drives the transition; no wheel interception.
      gsap.fromTo(".first-vd", { opacity: 0 }, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".first-vd-wrapper",
          start: "top bottom",
          end: "top 35%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.timeline({
        scrollTrigger: {
          trigger: ".first-vd-wrapper",
          start: "top top",
          end: "+=75%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }).to(".first-vd", { scale: 1.04, ease: "none" });
    });
    return () => media.revert();
  }, []);
  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          src={`${import.meta.env.BASE_URL}assets/videos/last-vid.mp4`}
          className="first-vd"
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          poster={`${import.meta.env.BASE_URL}assets/images/video-1-poster.webp`}
          aria-hidden="true"
        ></video>
      </div>
    </section>
  );
}
