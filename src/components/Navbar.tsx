// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'About Us', href: '/about' },
  { name: 'Why Choose Us', href: '/why-choose-us' },
  { name: 'Services', href: '/services' },
  { name: 'Partnership', href: '/partnership' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'
  const isPartnershipPage = location.pathname === '/partnership'
  const shouldBeTransparent = (isHomePage || isPartnershipPage) && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Color scheme logic
  const goldAccent = '#d4a853'
  const navBg = shouldBeTransparent
    ? 'bg-transparent'
    : isPartnershipPage
      ? 'bg-[#0a0a0a] shadow-lg shadow-black/20'
      : 'bg-white shadow-md'

  const logoColor = shouldBeTransparent
    ? 'text-white'
    : isPartnershipPage
      ? `text-[${goldAccent}]`
      : 'text-primary'

  const linkColor = (isActive: boolean) => {
    if (isActive) {
      return shouldBeTransparent ? 'text-white' : isPartnershipPage ? 'text-[#d4a853]' : 'text-primary'
    }
    return shouldBeTransparent
      ? 'text-white/80 hover:text-white'
      : isPartnershipPage
        ? 'text-gray-300 hover:text-[#d4a853]'
        : 'text-gray-700 hover:text-primary'
  }

  const ctaClasses = shouldBeTransparent
    ? isPartnershipPage
      ? 'bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]'
      : 'bg-white text-primary hover:bg-white/90'
    : isPartnershipPage
      ? 'bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)]'
      : 'bg-primary text-white hover:bg-primary/90'

  const hamburgerColor = shouldBeTransparent
    ? 'text-white hover:text-white/80'
    : isPartnershipPage
      ? 'text-gray-300 hover:text-[#d4a853]'
      : 'text-gray-700 hover:text-primary'

  const mobileBg = isPartnershipPage ? 'bg-[#0a0a0a]' : 'bg-white'
  const mobileLinkColor = (isActive: boolean) => {
    if (isActive) return isPartnershipPage ? 'text-[#d4a853]' : 'text-primary'
    return isPartnershipPage ? 'text-gray-300 hover:text-[#d4a853]' : 'text-gray-700 hover:text-primary'
  }
  const mobileCta = isPartnershipPage
    ? 'bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808]'
    : 'bg-primary text-white hover:bg-primary/90'

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-2">
              <svg
                className={`w-10 h-10 ${logoColor}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                <path d="M8 10h.01" />
                <path d="M12 10h.01" />
                <path d="M16 10h.01" />
              </svg>
              <span className={`text-2xl font-bold ${logoColor}`}>
                Focus Recruitment
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${linkColor(location.pathname === item.href)}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className={`ml-4 px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${ctaClasses}`}
              >
                Hire Now
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${hamburgerColor} focus:outline-none`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${mobileBg}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${mobileLinkColor(location.pathname === item.href)}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className={`block w-full text-center px-6 py-2 rounded-md text-base font-medium mt-4 ${mobileCta}`}
                onClick={() => setIsOpen(false)}
              >
                Hire Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
