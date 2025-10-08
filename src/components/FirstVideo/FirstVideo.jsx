import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function FirstVideo() {
  const videoRef = useRef();
  useGSAP(() => {
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
            videoRef.current.play();
        }
      },
    });
    t1.to(".hero-section", {
      opacity: 0,
      ease: "power1.inOut",
      onComplete: () => {
        videoRef.current.play();
      },
    }).to(".first-vd-wrapper", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          src="/assets/videos/last-vid.mp4"
          className="first-vd"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        ></video>
      </div>
    </section>
  );
}
