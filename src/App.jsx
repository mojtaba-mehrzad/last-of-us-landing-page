import { useState } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import Hero from "./modules/Hero"
import NavBar from "./components/NavBar"

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother,ScrollToPlugin,SplitText);

function App() {

  return (
    <main>
      <Hero/>
      <NavBar/>
    </main>
  )
}

export default App
