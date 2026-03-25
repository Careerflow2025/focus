import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'

// ── animation variants ──────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── data ─────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '50/50 Profit Split',
    desc: 'A true partnership \u2014 every placement fee is split equally. Your success is our success.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Full Online Training',
    desc: 'Comprehensive training programme covering sourcing, sales, compliance, and everything in between.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: 'Work in Any Industry',
    desc: 'Recruit across healthcare, tech, finance, legal, construction \u2014 any sector you choose.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'No Experience Needed',
    desc: 'We equip you from scratch. If you have the drive, we provide everything else.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    title: 'Work 100% Remotely',
    desc: 'Run your recruitment business from anywhere with a laptop and an internet connection.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Back-Office Support',
    desc: 'Contracts, compliance, invoicing and payroll \u2014 we handle the admin so you can focus on earning.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Apply & Get Selected',
    desc: 'Submit your application. We review every candidate carefully \u2014 only serious, driven individuals are accepted.',
  },
  {
    num: '02',
    title: 'Complete Our Training',
    desc: 'Access our comprehensive online training covering candidate sourcing, client acquisition, and the full recruitment lifecycle.',
  },
  {
    num: '03',
    title: 'Start Recruiting',
    desc: 'Choose your industry, leverage our tools and CRM, and begin placing candidates with UK businesses.',
  },
  {
    num: '04',
    title: 'Earn 50% of Every Fee',
    desc: 'Each successful placement earns a fee \u2014 and half of it is yours. Scale up to \u00a320k+/month as you grow.',
  },
]

const earningTiers = [
  { placements: '1-2', fee: '\u00a33,000\u2013\u00a36,000', monthly: '\u00a31,500\u2013\u00a33,000', label: 'Getting Started' },
  { placements: '3-5', fee: '\u00a39,000\u2013\u00a315,000', monthly: '\u00a34,500\u2013\u00a37,500', label: 'Building Momentum' },
  { placements: '5-8', fee: '\u00a315,000\u2013\u00a324,000', monthly: '\u00a37,500\u2013\u00a312,000', label: 'Established Partner' },
  { placements: '8+', fee: '\u00a324,000+', monthly: '\u00a312,000\u2013\u00a320,000+', label: 'Top Performer' },
]

const faqs = [
  {
    q: 'Do I need any recruitment experience?',
    a: 'Absolutely not. Our training programme is designed to take complete beginners and turn them into confident, effective recruiters. All you need is motivation and a willingness to learn.',
  },
  {
    q: 'How does the 50/50 profit split work?',
    a: 'When you successfully place a candidate with a client, the company earns a placement fee (typically 15\u201320% of the candidate\u2019s annual salary). That fee is split equally between you and Focus Recruitment \u2014 50% goes directly to you.',
  },
  {
    q: 'Is there any upfront cost or investment?',
    a: 'Please get in touch to discuss the details of the partnership model. We\u2019ll walk you through everything during the selection process.',
  },
  {
    q: 'Can I do this alongside my current job?',
    a: 'Yes. Many of our partners start part-time while building their pipeline. Because it\u2019s fully remote, you can work on your own schedule and transition to full-time when you\u2019re ready.',
  },
  {
    q: 'What industries can I recruit in?',
    a: 'Any industry. We operate across healthcare, technology, finance, legal, engineering, education, social work, dental, construction, and more. You choose the sector that interests you most.',
  },
  {
    q: 'What tools and support do I get?',
    a: 'You\u2019ll receive access to our CRM system, job boards, candidate databases, email templates, compliance frameworks, and ongoing mentorship from experienced recruiters.',
  },
  {
    q: 'How selective is the programme?',
    a: 'Very. We only accept a small number of partners at a time to ensure each person receives the attention and support they need to succeed. We look for ambition, professionalism, and strong communication skills.',
  },
  {
    q: 'How quickly can I start earning?',
    a: 'This depends on your effort and chosen sector. Some partners make their first placement within their first month. On average, partners with consistent effort start generating income within 4\u20138 weeks.',
  },
]

// ── form types ───────────────────────────────────────────────────────
type FormData = {
  fullName: string
  email: string
  phone: string
  location: string
  experience: string
  industry: string
  availability: string
  motivation: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

// ── section wrapper ──────────────────────────────────────────────────
function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <div ref={ref} id={id} className={className}>
      {inView ? children : <div className="opacity-0">{children}</div>}
    </div>
  )
}

// ── main component ───────────────────────────────────────────────────
export default function Partnership() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    industry: '',
    availability: '',
    motivation: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const formRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ── validation ──────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Please enter a valid email'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    if (!formData.location.trim()) e.location = 'Please enter your location'
    if (!formData.motivation.trim()) e.motivation = 'Please tell us why you want to join'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── submit ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(
        'service_l7eb08w',
        'template_1gy2ljs',
        {
          from_name: formData.fullName,
          from_email: formData.email,
          message: `PARTNERSHIP APPLICATION\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.location}\nExperience: ${formData.experience || 'None'}\nPreferred Industry: ${formData.industry || 'Not specified'}\nAvailability: ${formData.availability || 'Not specified'}\n\nMotivation:\n${formData.motivation}`,
          type: 'partnership',
        },
        'I9jsCcLG5BmWrWZXx'
      )
      setSubmitStatus('success')
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        industry: '',
        availability: '',
        motivation: '',
      })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden">
      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f00] via-[#0d0805] to-[#080808]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(212,168,83,0.4) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4a853]/[0.06] rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/[0.08] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#d4a853] animate-pulse" />
              <span className="text-[#d4a853] text-sm font-medium tracking-wider uppercase">
                Limited Places Available
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="text-white">Start a Lucrative</span>
              <br />
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Recruitment Business
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed"
            >
              Join our <span className="text-[#d4a853] font-semibold">50/50 Profit Partnership</span> and
              build your own recruitment desk with full training, tools, and back-office support from
              Focus Recruitment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10"
            >
              Earn{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                &pound;5k&ndash;&pound;20k+
              </span>{' '}
              per month
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToForm}
                className="group relative px-10 py-4 rounded-lg font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#d4a853] to-[#c9942e] transition-opacity duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#c9942e] to-[#d4a853] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-[#080808] flex items-center gap-2">
                  Apply for Partnership
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
              <a
                href="https://wa.me/442039473993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-lg border border-[#d4a853]/40 text-[#d4a853] font-semibold hover:bg-[#d4a853]/10 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </motion.div>

            {/* Trust markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                No Experience Required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Work Remotely
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Full Training Provided
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Any Industry
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      </section>

      {/* ════════════════════════════════════════════════════════════
          POSTER SECTION
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0c0906] to-[#080808]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Poster image */}
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#d4a853]/20 to-transparent rounded-2xl blur-xl" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#d4a853]/10 border border-[#d4a853]/20">
                <img
                  src="/images/partnership-poster.png"
                  alt="Focus Recruitment 50/50 Profit Partnership"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Your Own Recruitment Business.{' '}
                <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                  Our Infrastructure.
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Focus Recruitment is offering a rare opportunity for ambitious individuals to launch
                their own recruitment desk under our established brand. You bring the hustle &mdash;
                we provide the platform, training, technology, and compliance framework.
              </p>
              <div className="space-y-4 pt-2">
                {[
                  'Established brand with active client base across the UK',
                  'Access to premium job boards and candidate databases',
                  'CRM, compliance, and contracts handled for you',
                  'Dedicated mentorship from senior recruitment consultants',
                  'Transparent 50/50 revenue split on every placement',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] font-semibold hover:shadow-[0_0_30px_rgba(212,168,83,0.25)] transition-all duration-300"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          BENEFITS
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-[#0a0906]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3"
            >
              Why Partner With Us
            </motion.p>
            <motion.h2
              variants={fadeIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold"
            >
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Succeed
              </span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeIn}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#d4a853]/20 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4a853]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853] mb-5">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{b.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#080808]" />
        {/* Decorative line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4a853]/20 to-transparent hidden lg:block" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3"
            >
              The Process
            </motion.p>
            <motion.h2
              variants={fadeIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold"
            >
              How It{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Works
              </span>
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeIn}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="relative pl-20 md:pl-0"
              >
                {/* Mobile left number */}
                <div className="absolute left-0 top-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c9942e] flex items-center justify-center md:relative md:mb-4">
                  <span className="text-[#080808] font-bold text-xl">{step.num}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          EARNINGS TABLE
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-[#0a0906]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3"
            >
              Earning Potential
            </motion.p>
            <motion.h2
              variants={fadeIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              What You Could{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Earn
              </span>
            </motion.h2>
            <motion.p
              variants={fadeIn}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Based on typical UK permanent recruitment fees (15&ndash;20% of salary) with a 50/50 split. Your share shown below.
            </motion.p>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-4 bg-[#d4a853]/10 border-b border-white/[0.08]">
                <div className="p-4 md:p-5 text-sm font-semibold text-[#d4a853] uppercase tracking-wider">Level</div>
                <div className="p-4 md:p-5 text-sm font-semibold text-[#d4a853] uppercase tracking-wider text-center">Placements/mo</div>
                <div className="p-4 md:p-5 text-sm font-semibold text-[#d4a853] uppercase tracking-wider text-center hidden sm:block">Total Fees</div>
                <div className="p-4 md:p-5 text-sm font-semibold text-[#d4a853] uppercase tracking-wider text-right">Your Earnings</div>
              </div>
              {/* Rows */}
              {earningTiers.map((tier, i) => (
                <div
                  key={tier.label}
                  className={`grid grid-cols-4 ${
                    i < earningTiers.length - 1 ? 'border-b border-white/[0.06]' : ''
                  } ${i === earningTiers.length - 1 ? 'bg-[#d4a853]/[0.05]' : 'hover:bg-white/[0.02]'} transition-colors`}
                >
                  <div className="p-4 md:p-5">
                    <span className="font-medium text-white">{tier.label}</span>
                  </div>
                  <div className="p-4 md:p-5 text-center text-gray-300">{tier.placements}</div>
                  <div className="p-4 md:p-5 text-center text-gray-300 hidden sm:block">{tier.fee}</div>
                  <div className="p-4 md:p-5 text-right">
                    <span className={`font-bold ${i === earningTiers.length - 1 ? 'text-[#d4a853] text-lg' : 'text-white'}`}>
                      {tier.monthly}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              Figures are illustrative and based on average UK recruitment placement fees. Actual earnings depend on individual effort and sector.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          WHO WE'RE LOOKING FOR
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-[#080808]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <p className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3">
                Selection Criteria
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                We&rsquo;re Selective for a{' '}
                <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                  Reason
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                This isn&rsquo;t for everyone. We&rsquo;re looking for a small number of exceptional
                individuals who are ready to commit to building something meaningful. Previous
                recruitment experience is <strong className="text-white">not</strong> required &mdash;
                but the following qualities are.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] font-semibold hover:shadow-[0_0_30px_rgba(212,168,83,0.25)] transition-all duration-300"
              >
                Check If You Qualify
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </motion.div>

            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-4"
            >
              {[
                { trait: 'Ambitious & Self-Motivated', detail: 'You set high goals and pursue them with discipline.' },
                { trait: 'Strong Communicator', detail: 'You can build rapport quickly with clients and candidates.' },
                { trait: 'Resilient & Persistent', detail: 'Recruitment rewards those who push through challenges.' },
                { trait: 'Professional & Reliable', detail: 'You represent our brand \u2014 we need people who take that seriously.' },
                { trait: 'Coachable', detail: 'You\u2019re open to learning and following a proven system.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#d4a853]/20 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#d4a853]/10 flex items-center justify-center">
                    <span className="text-[#d4a853] font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{item.trait}</h4>
                    <p className="text-gray-400 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-[#0a0906]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.p
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3"
            >
              Common Questions
            </motion.p>
            <motion.h2
              variants={fadeIn}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-300 ${
                    openFaq === i
                      ? 'border-[#d4a853]/30 bg-[#d4a853]/[0.05]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white text-lg">{faq.q}</h3>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 text-[#d4a853] transition-transform duration-300 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? 'max-h-96 mt-4' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          APPLICATION FORM
      ════════════════════════════════════════════════════════════ */}
      <AnimatedSection id="apply" className="py-20 md:py-28 relative">
        <div ref={formRef} className="absolute -top-24" />
        <div className="absolute inset-0 bg-[#080808]" />
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4a853]/[0.04] rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.p
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#d4a853] font-medium tracking-wider uppercase text-sm mb-3"
              >
                Start Your Journey
              </motion.p>
              <motion.h2
                variants={fadeIn}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Apply for{' '}
                <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                  Partnership
                </span>
              </motion.h2>
              <motion.p
                variants={fadeIn}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-400"
              >
                Complete the form below. We review every application personally and will be in touch
                within 48 hours if you&rsquo;re shortlisted.
              </motion.p>
            </div>

            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-10 rounded-2xl border border-[#d4a853]/30 bg-[#d4a853]/[0.05]"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4a853]/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#d4a853]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Submitted</h3>
                <p className="text-gray-400">
                  Thank you for your interest. We&rsquo;ll review your application and get back to you
                  within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-5 p-8 md:p-10 rounded-2xl border border-white/[0.08] bg-white/[0.02]"
              >
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                    Something went wrong. Please try again or contact us directly at info@focusrecruitment.co.uk
                  </div>
                )}

                {/* Row: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-[#d4a853]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-white/[0.05] border ${
                        errors.fullName ? 'border-red-500/50' : 'border-white/[0.1]'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all`}
                      placeholder="John Smith"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-[#d4a853]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-white/[0.05] border ${
                        errors.email ? 'border-red-500/50' : 'border-white/[0.1]'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Row: Phone + Location */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-[#d4a853]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-white/[0.05] border ${
                        errors.phone ? 'border-red-500/50' : 'border-white/[0.1]'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all`}
                      placeholder="+44 7XXX XXXXXX"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Location <span className="text-[#d4a853]">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-lg bg-white/[0.05] border ${
                        errors.location ? 'border-red-500/50' : 'border-white/[0.1]'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all`}
                      placeholder="e.g. London, UK"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-400">{errors.location}</p>}
                  </div>
                </div>

                {/* Row: Experience + Industry */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recruitment Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="" className="bg-[#1a1a1a]">Select experience level</option>
                      <option value="none" className="bg-[#1a1a1a]">No experience</option>
                      <option value="some" className="bg-[#1a1a1a]">Some experience (0-1 year)</option>
                      <option value="experienced" className="bg-[#1a1a1a]">Experienced (1-3 years)</option>
                      <option value="senior" className="bg-[#1a1a1a]">Senior (3+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Industry
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                    >
                      <option value="" className="bg-[#1a1a1a]">Select preferred industry</option>
                      <option value="healthcare" className="bg-[#1a1a1a]">Healthcare</option>
                      <option value="technology" className="bg-[#1a1a1a]">Technology</option>
                      <option value="finance" className="bg-[#1a1a1a]">Finance &amp; Accounting</option>
                      <option value="legal" className="bg-[#1a1a1a]">Legal</option>
                      <option value="engineering" className="bg-[#1a1a1a]">Engineering</option>
                      <option value="education" className="bg-[#1a1a1a]">Education</option>
                      <option value="social-work" className="bg-[#1a1a1a]">Social Work</option>
                      <option value="dental" className="bg-[#1a1a1a]">Dental</option>
                      <option value="construction" className="bg-[#1a1a1a]">Construction</option>
                      <option value="multiple" className="bg-[#1a1a1a]">Multiple / Undecided</option>
                    </select>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all appearance-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\' stroke-width=\'2\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M19.5 8.25l-7.5 7.5-7.5-7.5\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                  >
                    <option value="" className="bg-[#1a1a1a]">When can you start?</option>
                    <option value="immediately" className="bg-[#1a1a1a]">Immediately</option>
                    <option value="1-2-weeks" className="bg-[#1a1a1a]">Within 1-2 weeks</option>
                    <option value="1-month" className="bg-[#1a1a1a]">Within 1 month</option>
                    <option value="flexible" className="bg-[#1a1a1a]">Flexible</option>
                  </select>
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Why do you want to join? <span className="text-[#d4a853]">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-white/[0.05] border ${
                      errors.motivation ? 'border-red-500/50' : 'border-white/[0.1]'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4a853]/50 focus:border-transparent transition-all resize-none`}
                    placeholder="Tell us about yourself, your goals, and why this partnership interests you..."
                  />
                  {errors.motivation && <p className="mt-1 text-sm text-red-400">{errors.motivation}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>

                <p className="text-center text-gray-500 text-xs">
                  By submitting, you agree to be contacted by Focus Recruitment regarding this partnership opportunity.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* ════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0906] to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a853]/[0.03] via-transparent to-[#d4a853]/[0.03]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your Future in{' '}
              <span className="bg-gradient-to-r from-[#f0d78c] via-[#d4a853] to-[#c9942e] bg-clip-text text-transparent">
                Recruitment
              </span>
              ?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Spaces are limited. Don&rsquo;t wait &mdash; apply today and take the first step toward
              financial independence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToForm}
                className="group px-10 py-4 rounded-lg bg-gradient-to-r from-[#d4a853] to-[#c9942e] text-[#080808] font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,168,83,0.3)] transition-all duration-300"
              >
                Apply for Partnership
              </button>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="hidden sm:block">or call</span>
                <a
                  href="tel:02039473993"
                  className="text-[#d4a853] font-semibold hover:underline text-lg"
                >
                  020 3947 3993
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
