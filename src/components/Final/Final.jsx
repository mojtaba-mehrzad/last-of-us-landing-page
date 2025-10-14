import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";

export default function Final() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;

      const onMetaDataLoaded = () => {
        const videoDuration = video.duration;

        const pxPerSec = 1000;
        const scrollLength = videoDuration * pxPerSec;

        gsap.set(section, { marginTop: "-20dvh", opacity: 0 });

        gsap.to(section, {
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 5,
          },
        });

        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollLength + 500} center`,
            scrub: 0.3,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onRefreshInit: () => {
              video.pause();
              try {
                video.currentTime = 0;
              } catch {}
            },
            onEnter: (self) => {
              const t = self.progress * videoDuration;
              try {
                video.fastSeek ? video.fastSeek(t) : (video.currentTime = t);
              } catch {}
            },
            onUpdate: (self) => {
              const videoProgress = Math.min(self.progress * ((scrollLength + 500) / scrollLength), 1);
              const targetTime = videoProgress * videoDuration;
              const currentTime = video.currentTime;
              const timeDiff = Math.abs(targetTime - currentTime);
              
              if (videoProgress < 1) {
                try {
                  video.currentTime = targetTime;
                } catch {
                }
              }
            },
            onEnterBack: (self) => {
              const t = self.progress * videoDuration;
              try {
                video.fastSeek ? video.fastSeek(t) : (video.currentTime = t);
              } catch {}
            },
          },
        });

        mainTimeline.to(
          section,
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 3,
          },
          `+=${scrollLength / 760}`
        );
      };

      video.addEventListener("loadedmetadata", onMetaDataLoaded, {
        once: true,
      });

      return () => {
        video.removeEventListener("loadedmetadata", onMetaDataLoaded);
      };
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
          preload="auto"
          className="size-full object-cover"
        ></video>
      </div>
    </section>
  );
}
