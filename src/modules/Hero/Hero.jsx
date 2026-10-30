import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import DoubleArrow from '../../components/DoubleArrow';
import Intro from '../Intro';

function Hero() {
  useGSAP(()=>{
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
    gsap.set(".mask-wrapper",{
      maskPosition:"50% 8%",
      maskSize:"30000% 30000%"
    })
    gsap.set(".overlay-logo",{
      opacity:0
    })
    const t1= gsap.timeline({
      scrollTrigger:{
        trigger:".hero-section ",
        start:"top top",
        end:'+=400%',
        scrub:2.5,
        pin:true,
        //markers:true
      }
    })
    t1.to('.fade-out',{
      opacity:0,
      ease:"power1.inOut"
    })
    .to('.scale-out',{
      scale:1,
      ease:"power1.inOut"
    },"<")
    .to('.mask-wrapper',{maskSize:"20% 35%",ease:'power1.inOut'},"<")
    .to('.mask-wrapper',{maskPosition:"50% 8%",ease:'power1.inOut'},"<")
    .to('.mask-wrapper',{opacity:0,ease:'power1.inOut'},"-=0.1")
    .to('.overlay-logo ',{opacity:1,ease:'power1.inOut'},"-=0.3")
    .to('.entrance-message',{maskImage:"radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",ease:"power1.inOut"},"-=0.4")
    });
    media.add("(max-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Keep the same story beats as desktop: the photograph contracts into
      // the logo, then the second scene is revealed from the bottom.
      gsap.set(".mask-wrapper", {
        maskPosition: "50% 12%",
        maskSize: "160% 170%",
        opacity: 0,
      });
      gsap.set(".hero-mobile-backdrop", { opacity: 1 });
      gsap.set(".scale-out", { scale: 1.18 });
      gsap.set(".overlay-logo", { opacity: 0 });
      gsap.set(".entrance-message", {
        visibility: "visible",
        opacity: 1,
        maskImage: "none",
        clipPath: "circle(0% at 50% 100%)",
      });
      gsap.set(".entrance-message > div > img", { scale: 1.12, yPercent: 5 });
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=320%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(".fade-out", { opacity: 0, duration: 0.7, ease: "power1.inOut" }, 0)
        .to(".scale-out", { scale: 1, duration: 1.2, ease: "power1.inOut" }, 0)
        .to(".mask-wrapper", { opacity: 1, duration: 0.6, ease: "power1.inOut" }, 0.2)
        .to(".hero-mobile-backdrop", { opacity: 0, duration: 0.85, ease: "power1.inOut" }, 0.25)
        .to(".mask-wrapper", { maskSize: "30% 32%", duration: 1.2, ease: "power1.inOut" }, 0)
        .to(".mask-wrapper", { opacity: 0, duration: 0.35, ease: "power1.inOut" }, 1.15)
        .to(".overlay-logo", { opacity: 1, duration: 0.35, ease: "power1.inOut" }, 1.15)
        .to(".entrance-message", {
          clipPath: "circle(150% at 50% 100%)",
          duration: 1.25,
          ease: "power1.inOut",
        }, 1.35)
        .to(".entrance-message > div > img", {
          scale: 1, yPercent: 0, duration: 1.25, ease: "power1.inOut",
        }, 1.35);
    });
    return () => media.revert();
  },[])

  return (
    <section className='hero-section' id="home" aria-label="The Last of Us">
      <div className="hero-mobile-backdrop" aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}assets/images/hero1.jpg`} alt="" className="scale-out" />
      </div>
      <div className='size-full mask-wrapper '>
        <img src={`${import.meta.env.BASE_URL}assets/images/hero1.jpg`} alt="" className='scale-out' fetchPriority="high"/>
        <DoubleArrow/>
      </div>
      <div className="hero-mobile-cue"><DoubleArrow/></div>
      <div className='fake-logo-wrapper'>
        <img src={`${import.meta.env.BASE_URL}assets/images/white-us-logo.svg`} alt="The Last of Us" className='overlay-logo '/>
      </div>
      <Intro/>
    </section>
  )
}
export default Hero;