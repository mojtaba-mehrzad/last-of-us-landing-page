import { useGSAP } from '@gsap/react';
import {useMaskSettings} from "../../utils"
import gsap from 'gsap';
import React from 'react'
import DoubleArrow from '../../components/DoubleArrow/DoubleArrow';

function Hero() {
  const {initialMaskPos, initialMaskSize, maskPos, maskSize}=useMaskSettings()
  useGSAP(()=>{
    gsap.set(".mask-wrapper",{
      maskPosition:initialMaskPos,
      maskSize:initialMaskSize
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
    .to('.mask-wrapper',{maskSize,ease:'power1.inOut'},"<")
    .to('.mask-wrapper',{maskPosition:maskPos,ease:'power1.inOut'},"<")
    .to('.mask-wrapper',{opacity:0,ease:'power1.inOut'},"-=0.2")
    .to('.overlay-logo ',{opacity:1,ease:'power1.inOut'},"-=0.2")

  },[])

  return (
    <section className='hero-section'>
      <div className='size-full mask-wrapper '>
        <img src="../../../assets/images/hero1.jpg" alt="" className='scale-out'/>
        <DoubleArrow/>
      </div>
      <div className='fake-logo-wrapper'>
        <img src="../../../assets/images/white-us-logo.svg" alt=""  className='overlay-logo '/>
      </div>
    </section>
  )
}
export default Hero;