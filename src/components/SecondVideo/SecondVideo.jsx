import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

export default function SecondVideo() {
  const videoRef = useRef();
  useGSAP(() => {
    gsap.set(".abby", { marginTop: "-60vh", opacity: 0 });
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".abby",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        onEnterBack: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        },
        onEnter: () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        },
      },
    });
    t1.to(".abby", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <section className="abby">
      <div className="h-dvh">
        <video
          src="/assets/videos/last-vid-2.mp4"
          className="second-vd"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </section>
  );
}
