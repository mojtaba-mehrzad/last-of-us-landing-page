import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Outro() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const finalSection = document.querySelector(".final");
      const finalVideo = document.querySelector(".final video");

      gsap.set(section, { opacity: 0, pointerEvents: "none" });
      if (finalVideo) {
        const setupOutro = () => {
          const videoDuration = finalVideo.duration;
          const pxPerSec = 1000;
          const scrollLength = videoDuration * pxPerSec;

          gsap.to(section, {
            opacity: 1,
            pointerEvents: "auto",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: finalSection,
              start: `+=${scrollLength} center`,
              end: `+=${scrollLength + 500} center`,
              scrub: 0.3,
              id: "outro-fadein",
            },
          });
        };

        if (finalVideo.readyState >= 1) {
          setupOutro();
        } else {
          finalVideo.addEventListener("loadedmetadata", setupOutro, {
            once: true,
          });
        }
      }
    },
    { scope: sectionRef }
  );
  return (
    <section ref={sectionRef} className="final-message">
      <div className="col-center gap-10 h-full">
        <div>
          <h3 className="gradient-title"> “Revenge won’t bring you peace.”</h3>
        </div>
        <div className="flex-center gap-10">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/ps-logo.svg`}
            alt=""
            className="md:w-32 w-20"
          />
          <img
            src={`${import.meta.env.BASE_URL}assets/images/x-logo.svg`}
            alt=""
            className="md:w-52 w-40"
          />
        </div>
      </div>
    </section>
  );
}
