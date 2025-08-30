import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { Draggable } from "gsap/Draggable"
import { EaselPlugin } from "gsap/EaselPlugin"
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack"
import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { Observer } from "gsap/Observer"
import { PixiPlugin } from "gsap/PixiPlugin"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Provider } from "react-redux"
import App from "./App.tsx"
import store from "./app/store"

gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
