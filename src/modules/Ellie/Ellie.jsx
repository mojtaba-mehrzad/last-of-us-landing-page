import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Ellie() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    gsap.set(".ellie", { marginTop: "-80vh" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".ellie",
          start: "top 90%",
          end: "10% center",
          scrub: 2,
          //markers: true,
        },
      })
      .to(".first-vd", { opacity: 0, ease: "power1.inOut" })
      .to(
        ".ellie .img-box",
        {
          scrollTrigger: {
            trigger: ".ellie",
            start: "top center",
            end: "80% center",
            scrub: 2,
          },
          y: -300,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
    });
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // The overlap makes the video-to-Ellie fade visible instead of fading
      // a video that has already scrolled off screen.
      gsap.to(".first-vd-wrapper", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".ellie",
          start: "top bottom",
          end: "top 35%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(".ellie .img-box", { y: 36 }, {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: ".ellie .img-box",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => media.revert();
  }, []);

  return (
    <section className="ellie" id="ellie" aria-labelledby="ellie-heading">
      <div className="max-w-lg ellie-content">
        <h1 id="ellie-heading">Ellie</h1>
        <h2>A fierce survivor in a post-apocalyptic world.</h2>
        <p>
          Ellie grew up in a world devastated by the Cordyceps outbreak.
          Strong-willed and clever, she’s faced countless dangers from infected
          and humans alike. Despite her tough exterior, Ellie carries deep
          emotions and a longing for connection and hope.
        </p>
        <div className="ellie-2">
          <img src={`${import.meta.env.BASE_URL}assets/images/ellie2.jpg`} alt="Ellie in the wilderness" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="space-y-5 mt-96 img-box">
        <div className="ellie-1">
          <img src={`${import.meta.env.BASE_URL}assets/images/ellie1.jpg`} alt="Ellie on her journey" loading="lazy" decoding="async" />
        </div>
        <div className="ellie-3">
          <img src={`${import.meta.env.BASE_URL}assets/images/ellie3.jpg`} alt="Ellie in a ruined city" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  );
}
