import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// Animation variants
const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeIn" }
  }
}

const jobRoles = [
  {
    title: 'Planning Consultant',
    description: 'Expert planning consultants for urban development and infrastructure projects.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: 'Independent Social Worker',
    description: 'Qualified social workers for fostering, adoption, and safeguarding assessments.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Virtual Assistants',
    description: 'Professional virtual assistants to handle your administrative tasks efficiently.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'IT & Developers',
    description: 'Skilled IT professionals and developers for your technical needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Designers',
    description: 'Creative designers to bring your vision to life.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Customer Support',
    description: 'Dedicated customer support specialists to enhance your service quality.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Admin Support',
    description: 'Efficient administrative support to streamline your operations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Accountants',
    description: 'Professional accountants to manage your financial operations.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Sales Agents',
    description: 'Dynamic sales professionals to boost your revenue.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Project Managers',
    description: 'Experienced project managers to lead your initiatives.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Data Entry Clerks',
    description: 'Accurate data entry specialists for your information management.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Marketing Specialists',
    description: 'Creative marketing experts to grow your brand.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    content: "Focus Recruitment helped us find the perfect virtual assistant who has become an invaluable part of our team.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "Their IT recruitment service is exceptional. We found skilled developers who perfectly matched our requirements.",
    author: "Michael Chen",
    role: "CTO, Innovate Solutions",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "The designers they provided have transformed our brand identity. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Marketing Director, Creative Co.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

// Featured jobs data
const featuredJobs = [
  {
    title: 'Planning Consultant (Remote)',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Fully remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  },
  {
    title: 'Independent Social Worker (Remote)',
    category: 'Social Work',
    description: 'Join our network to conduct fostering, adoption, and safeguarding assessments. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  },
  {
    title: 'Virtual Assistant (Remote)',
    category: 'Virtual Assistants',
    description: 'Provide administrative support to clients remotely. Experience with email management and scheduling required.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  },
  {
    title: 'Software Engineer (Remote)',
    category: 'Engineering',
    description: 'Develop and maintain software solutions for UK-based clients. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  },
  {
    title: 'Senior Accountant (Remote)',
    category: 'Accountants',
    description: 'Lead financial operations and ensure compliance for UK-based clients. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  },
  {
    title: 'Admin Support (Remote)',
    category: 'Admin Support',
    description: 'Provide comprehensive administrative support. Remote position with UK business hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993'
  }
]

// Update the animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.2
    }
  }
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: 'easeOut'
    }
  }
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 320 // card width + gap
      const newScrollLeft = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [selectedJobForApply, setSelectedJobForApply] = useState<any>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    cv: null as File | null
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  const handleApplyClick = (job: any) => {
    setSelectedJobForApply(job)
    setIsApplyModalOpen(true)
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      cv: null
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log('Form submitted:', { job: selectedJobForApply, ...formData })
    setIsSubmitted(true)
    setTimeout(() => {
      setIsApplyModalOpen(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
      {/* Hero Section with Video Background */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary-dark/90 backdrop-blur-sm" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find Your Perfect Remote Talent
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect with skilled professionals from around the world. We help you build your dream team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Job Roles Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Job Roles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a wide range of professional roles available through our recruitment services.
            </p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-24">
            <button
              onClick={() => scrollSlider('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div 
              ref={sliderRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex space-x-8 min-w-max py-4">
                {jobRoles.map((role, index) => (
                  <motion.div
                    key={role.title}
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="w-80 flex-shrink-0 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <div className="text-primary mb-6 transform hover:scale-110 transition-transform duration-200">
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                    <p className="text-gray-600">{role.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollSlider('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-primary p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Work That Fits Your Life Section */}
      <section className="py-20 relative overflow-hidden" ref={sectionRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-dark/5">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Q50,80 0,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div
              variants={textVariants}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Work That Fits Your Life</h2>
              <p className="text-gray-600 text-lg mb-6">
                Experience the freedom of remote work with flexible schedules and locations that suit your lifestyle.
                Our recruitment process ensures you find opportunities that align with your personal and professional goals.
              </p>
              <Link
                to="/services"
                className="inline-block text-primary font-semibold hover:text-primary-dark transition-colors duration-200 group"
              >
                Learn More 
                <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-200">→</span>
              </Link>
            </motion.div>
            <motion.div
              variants={imageVariants}
              className="order-1 md:order-2"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-200" />
                <div className="aspect-w-16 aspect-h-9 min-h-[300px] bg-gray-100 rounded-2xl overflow-hidden">
                  <motion.img
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                    alt="Person working remotely"
                    className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.02 }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Perks & Benefits Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden" ref={sectionRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-dark/5">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L100,100 L100,0 Q50,20 0,0 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <motion.div
              variants={imageVariants}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-200" />
                <div className="aspect-w-16 aspect-h-9 min-h-[300px] bg-gray-100 rounded-2xl overflow-hidden">
                  <motion.img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                    alt="Happy worker"
                    className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.02 }}
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={textVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Perks & Benefits</h2>
              <p className="text-gray-600 text-lg mb-6">
                Join a community of professionals who enjoy competitive compensation, comprehensive benefits,
                and continuous learning opportunities. We support your growth every step of the way.
              </p>
              <Link
                to="/why-choose-us"
                className="inline-block text-primary font-semibold hover:text-primary-dark transition-colors duration-200 group"
              >
                Explore Benefits 
                <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-200">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about our services.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <motion.p 
                  className="text-gray-600"
                  whileHover={{ scale: 1.02 }}
                >
                  "{testimonial.content}"
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/90" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Dream Team?
            </h2>
            <p className="text-xl mb-8">
              Let us help you find the perfect talent for your business needs.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover exciting opportunities in planning and social work across the UK
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {featuredJobs.map((job) => (
              <motion.div
                key={job.title}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {job.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Location:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.locations.map((location) => (
                        <span
                          key={location}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <p>{job.email}</p>
                        <p>{job.phone}</p>
                      </div>
                      <motion.button
                        onClick={() => handleApplyClick(job)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200"
                      >
                        Apply Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/jobs"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              See All Jobs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsApplyModalOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-6 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <h3 className="text-2xl font-semibold text-primary mb-2">Thank you!</h3>
                  <p className="text-gray-600">We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    Apply for {selectedJobForApply?.title}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message (Optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload CV
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        required
                        onChange={(e) => setFormData(prev => ({ ...prev, cv: e.target.files?.[0] || null }))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsApplyModalOpen(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
                      >
                        Submit Application
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 