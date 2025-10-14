import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import Hero from "./modules/Hero";
import NavBar from "./components/NavBar";
import FirstVideo from "./components/FirstVideo";
import Ellie from "./modules/Ellie";
import SecondVideo from "./components/SecondVideo";
import Abby from "./modules/Abby";
import Final from "./components/Final";
import Outro from "./modules/Outro";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText
);

function App() {
  return (
    <main>
      <Hero />
      <NavBar />
      <FirstVideo />
      <Ellie />
      <SecondVideo />
      <Abby />
      <Final />
      <Outro />
    </main>
  );
}

export default App;
