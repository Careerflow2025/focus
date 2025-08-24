import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

type FormData = {
  name: string
  email: string
  message: string
  type: 'candidate' | 'company'
  cv: File | null
  service: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
  cv?: string
  service?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    type: 'company',
    cv: null,
    service: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    if (formData.type === 'candidate' && !formData.cv) {
      newErrors.cv = 'CV is required for candidates'
    }

    if (formData.type === 'company' && !formData.service) {
      newErrors.service = 'Please select a service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        type: formData.type,
        service: formData.service,
        cv_name: formData.cv?.name || 'No CV attached'
      }

      await emailjs.send(
        'service_l7eb08w', // Your EmailJS service ID
        'template_1gy2ljs', // Your template ID
        templateParams,
        'I9jsCcLG5BmWrWZXx' // Your public key
      )

      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        message: '',
        type: 'company',
        cv: null,
        service: ''
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitError('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'type') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value as 'candidate' | 'company',
        cv: null,
        service: ''
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cv: file }))
  }

  const renderFileInfo = () => {
    if (formData.cv) {
      return (
        <div className="mt-2 text-sm text-gray-600">
          Selected file: {formData.cv.name}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl">
              Get in touch with our team to discuss your recruitment needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">02039473993</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@focusrecruitment.co.uk</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-600">
                  Focus Recruitment<br />
                  Unit 302, 167-169 Great Portland Street<br />
                  London, W1W 5PF<br />
                  United Kingdom
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Thank You for Contacting Us!
                </h3>
                <p className="text-green-600">
                  We've received your message and will get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a:
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="company"
                        checked={formData.type === 'company'}
                        onChange={handleChange}
                        className="form-radio text-primary"
                        disabled={isSubmitting}
                      />
                      <span className="ml-2">Company</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="candidate"
                        checked={formData.type === 'candidate'}
                        onChange={handleChange}
                        className="form-radio text-primary"
                        disabled={isSubmitting}
                      />
                      <span className="ml-2">Candidate</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {formData.type === 'company' && (
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.service ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      <option value="permanent">Permanent Recruitment</option>
                      <option value="contract">Contract Recruitment</option>
                      <option value="executive">Executive Search</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-sm text-red-600">{errors.service}</p>
                    )}
                  </div>
                )}

                {formData.type === 'candidate' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload CV
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cv ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                      disabled={isSubmitting}
                    />
                    {errors.cv && (
                      <p className="mt-1 text-sm text-red-600">{errors.cv}</p>
                    )}
                    {renderFileInfo()}
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg text-white font-medium ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark'
                    } transition-colors duration-200`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
} 