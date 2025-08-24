// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import Home from './pages/Home'
import About from './pages/About'
import WhyChooseUs from './pages/WhyChooseUs'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Jobs from './pages/Jobs'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
} 