import Hero from './components/Hero'
import Vision from './components/Vision'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'
import "./index.css"

export default function App() {
  return (
    <main className="font-primary min-h-screen w-full flex flex-col">
      <Hero />
      <Vision />
      <Portfolio />
      <Footer />
    </main>
  )
}
