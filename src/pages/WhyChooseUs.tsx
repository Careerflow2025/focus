import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

const benefits = [
  {
    title: 'Fast Hiring',
    description: 'Our streamlined process helps you find and hire the right talent quickly.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Quality Talent',
    description: 'We thoroughly vet all candidates to ensure you get the best talent.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Global Talent Pool',
    description: 'Access to a diverse pool of skilled professionals from around the world.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Affordable Pricing',
    description: 'Competitive rates that provide excellent value for your investment.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'AI-Enhanced Hiring',
    description: 'Leveraging advanced technology to match the perfect candidate with your needs.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description: 'Personalized assistance throughout the hiring process and beyond.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

const process = [
  {
    step: 1,
    title: 'Initial Consultation',
    description: 'We discuss your requirements and understand your business needs.',
  },
  {
    step: 2,
    title: 'Talent Search',
    description: 'Our team searches for the perfect candidates from our global talent pool.',
  },
  {
    step: 3,
    title: 'Screening & Selection',
    description: 'We thoroughly vet candidates to ensure they meet your requirements.',
  },
  {
    step: 4,
    title: 'Interview & Selection',
    description: 'You interview the shortlisted candidates and make your selection.',
  },
  {
    step: 5,
    title: 'Onboarding Support',
    description: 'We assist with the onboarding process to ensure a smooth transition.',
  },
]

const testimonials = [
  {
    content: "Focus Recruitment's process was incredibly efficient. We found the perfect candidate within two weeks.",
    author: "David Wilson",
    role: "HR Director, TechCorp",
  },
  {
    content: "The quality of candidates and the level of service exceeded our expectations.",
    author: "Lisa Chen",
    role: "CEO, StartupX",
  },
  {
    content: "Working with Focus Recruitment has transformed our hiring process. Highly recommended!",
    author: "Robert Johnson",
    role: "CTO, Innovate Solutions",
  },
]

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Why Choose Us</h1>
            <p className="text-xl">
              Discover why we're the preferred choice for businesses seeking exceptional talent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a range of advantages that set us apart from other recruitment agencies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to finding and hiring the perfect talent for your business.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {step.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl mb-8">
              Let us help you find the perfect talent for your business needs.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 