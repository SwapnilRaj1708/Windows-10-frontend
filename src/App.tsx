import { Analytics } from "@vercel/analytics/react"
import Home from "./components/Home"
import LockScreen from "./components/LockScreen/LockScreen"

function App() {
  return (
    <>
      <Analytics />
      <LockScreen />
      <Home />
    </>
  )
}

export default App
