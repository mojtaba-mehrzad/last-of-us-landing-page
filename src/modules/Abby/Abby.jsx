import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Abby() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    gsap.set(".abby-life", { marginTop: "-90vh" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".abby-life",
          start: "top 80%",
          end: "10% center",
          scrub: 3.5,
        },
      })
      .to(".second-vd", { opacity: 0, ease: "power1.inOut" });
      gsap.to(
        ".abby-life .img-box",
        {
          scrollTrigger: {
            trigger: ".abby-life",
            start: "top center",
            end: "80% center",
            scrub: 2,
          },
          y: -200,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
    });
    return () => media.revert();
  }, []);

  return (
    <section className="abby-life" id="abby" aria-labelledby="abby-heading">
      <div className="flex flex-col gap-5 items-end img-box lg:w-1/2 ps-10 mt-96">
        <div className="abby-1">
          <img src={`${import.meta.env.BASE_URL}assets/images/abby1.webp`} alt="Abby on her journey" loading="lazy" decoding="async" />
        </div>
        <div className="abby-3">
          <img src={`${import.meta.env.BASE_URL}assets/images/abby3.jpg`} alt="Abby in a moment of reflection" loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="lg:w-1/2 abby-life-content">
        <div className="max-w-xl lg:ps-32 ps-10">
          <h1 id="abby-heading">Abby Anderson</h1>
          <h2>
            Trained as a soldier. Driven by vengeance. Hardened by survival.
          </h2>
          <p>
            Abby grew up in the Fireflies, shaped by her father’s ideals and the
            brutal reality of their world. After losing him, vengeance became
            her compass, pushing her to make choices that defined the rest of
            her life. Strong, disciplined, and unrelenting — Abby is both feared
            and respected.
          </p>
        </div>
        <div className="abby-2">
          <img src={`${import.meta.env.BASE_URL}assets/images/abby2.webp`} alt="Abby facing the aftermath" loading="lazy" decoding="async" />
        </div>
        <p className="max-w-xl lg:ps-32 ps-10">
          {" "}
          Beneath her tough exterior, Abby is haunted by the cycle of violence
          she’s been a part of.
        </p>
      </div>
    </section>
  );
}
