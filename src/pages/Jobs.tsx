import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

// Job categories
const categories = [
  'Virtual Assistants', 'IT & Developers', 'Designers', 'Admin Support',
  'Customer Support', 'Accountants', 'Sales & BD', 'Marketing',
  'HR & Recruitment', 'Legal', 'Social Work', 'Planning & Urban Dev',
  'Finance & Bookkeeping', 'Engineering', 'Operations', 'Executive & C-Level',
  'Healthcare', 'Data & Analytics', 'Project Management', 'Content Writing',
  'Education & Training', 'Logistics', 'Real Estate'
]

// Extended UK locations - London first, then Remote, then alphabetically sorted cities
const ukLocations = [
  'London', 
  'Remote',
  'Aberdeen', 'Bath', 'Belfast', 'Birmingham', 'Blackpool', 'Bolton', 'Bournemouth',
  'Bradford', 'Brighton', 'Bristol', 'Cambridge', 'Canterbury', 'Cardiff', 
  'Cheltenham', 'Chester', 'Colchester', 'Coventry', 'Derby', 'Doncaster',
  'Dundee', 'Durham', 'Edinburgh', 'Exeter', 'Glasgow', 'Gloucester',
  'Guildford', 'Hastings', 'Huddersfield', 'Hull', 'Inverness', 'Ipswich',
  'Leeds', 'Leicester', 'Lincoln', 'Liverpool', 'Luton', 'Manchester',
  'Margate', 'Middlesbrough', 'Milton Keynes', 'Newcastle', 'Newport', 'Northampton',
  'Norwich', 'Nottingham', 'Oxford', 'Peterborough', 'Plymouth', 'Portsmouth',
  'Preston', 'Reading', 'Salford', 'Sheffield', 'Shrewsbury', 'Slough',
  'Southampton', 'Southend-on-Sea', 'Stirling', 'Stoke-on-Trent', 'Sunderland',
  'Swansea', 'Swindon', 'Torquay', 'Wakefield', 'Warrington', 'Watford',
  'Wolverhampton', 'Worcester', 'York'
]

interface Job {
  title: string;
  category: string;
  description: string;
  locations: string[];
  email: string;
  phone: string;
  hours: string;
  responsibilities: string[];
  requirements: string[];
  severity: string;
}

const baseJobListings: Job[] = [
  {
    title: 'Senior Accountant (Remote)',
    category: 'Accountants',
    description: 'Lead financial operations and ensure compliance for UK-based clients. Must be available during UK business hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes for multiple clients',
      'Prepare and review financial statements and reports',
      'Handle tax planning and compliance',
      'Lead and mentor junior accounting staff',
      'Implement financial controls and procedures',
      'Coordinate with external auditors'
    ],
    requirements: [
      'Qualified accountant (ACA/ACCA/CIMA)',
      '5+ years of accounting experience',
      'Strong knowledge of UK accounting standards',
      'Experience with accounting software (Xero, QuickBooks)',
      'Excellent communication skills',
      'Ability to work independently'
    ],
    severity: 'high'
  },
  {
    title: 'Financial Controller (Remote)',
    category: 'Accountants',
    description: 'Oversee financial operations and strategic planning for growing businesses. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Develop and implement financial strategies',
      'Manage budgeting and forecasting processes',
      'Oversee financial reporting and analysis',
      'Lead financial planning and analysis',
      'Ensure regulatory compliance',
      'Manage relationships with stakeholders'
    ],
    requirements: [
      'Qualified accountant with 7+ years experience',
      'Strong leadership and management skills',
      'Experience in financial control and strategy',
      'Excellent analytical abilities',
      'Proficiency in financial software',
      'Strong business acumen'
    ],
    severity: 'high'
  },
  // Virtual Assistant positions
  {
    title: 'Executive Virtual Assistant',
    category: 'Virtual Assistants',
    description: 'Provide high-level administrative support to senior executives. Must be available during UK business hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage executive calendars and schedules',
      'Handle email correspondence and filtering',
      'Prepare reports and presentations',
      'Coordinate travel arrangements',
      'Organize virtual meetings and events',
      'Maintain confidential information'
    ],
    requirements: [
      '3+ years of executive assistant experience',
      'Excellent written and verbal communication',
      'Proficiency in Microsoft Office Suite',
      'Strong organizational skills',
      'Experience with project management tools',
      'Ability to work independently'
    ],
    severity: 'high'
  },
  {
    title: 'Digital Marketing VA',
    category: 'Virtual Assistants',
    description: 'Support marketing teams with content creation and social media management. Remote position with flexible hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Create and schedule social media content',
      'Manage email marketing campaigns',
      'Conduct market research',
      'Prepare marketing reports',
      'Coordinate with content creators',
      'Monitor social media engagement'
    ],
    requirements: [
      '2+ years of digital marketing experience',
      'Proficiency in social media platforms',
      'Experience with email marketing tools',
      'Basic graphic design skills',
      'Analytical mindset',
      'Excellent communication skills'
    ],
    severity: 'high'
  },
  // Sales Agent positions
  {
    title: 'Business Development Manager',
    category: 'Sales & BD',
    description: 'Drive business growth through strategic partnerships and client acquisition. Remote position with UK focus.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Develop and execute sales strategies',
      'Build and maintain client relationships',
      'Identify new business opportunities',
      'Lead sales presentations and negotiations',
      'Track and report sales metrics',
      'Collaborate with marketing team'
    ],
    requirements: [
      '5+ years of B2B sales experience',
      'Proven track record of meeting targets',
      'Strong negotiation skills',
      'Experience with CRM systems',
      'Excellent communication skills',
      'Business development expertise'
    ],
    severity: 'high'
  },
  {
    title: 'Sales Representative',
    category: 'Sales & BD',
    description: 'Generate leads and close sales for UK-based products and services. Remote position with commission structure.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Prospect and qualify leads',
      'Conduct sales calls and presentations',
      'Follow up with potential clients',
      'Maintain sales pipeline',
      'Achieve monthly sales targets',
      'Provide product demonstrations'
    ],
    requirements: [
      '2+ years of sales experience',
      'Strong closing skills',
      'Experience with sales tools',
      'Excellent communication skills',
      'Self-motivated and target-driven',
      'Customer-focused approach'
    ],
    severity: 'high'
  },
  // Personal Assistant positions
  {
    title: 'Personal Assistant to CEO',
    category: 'Admin Support',
    description: 'Provide comprehensive support to company executives. Must be available during UK business hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage executive calendar and schedule',
      'Handle confidential correspondence',
      'Prepare meeting materials and reports',
      'Coordinate travel arrangements',
      'Organize virtual and in-person events',
      'Maintain filing systems'
    ],
    requirements: [
      '5+ years of PA experience',
      'Excellent organizational skills',
      'Strong written and verbal communication',
      'Proficiency in Microsoft Office',
      'Discretion and confidentiality',
      'Problem-solving abilities'
    ],
    severity: 'high'
  },
  {
    title: 'Executive Assistant',
    category: 'Admin Support',
    description: 'Support senior management with administrative tasks and project coordination. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage executive communications',
      'Coordinate team meetings and events',
      'Prepare and edit documents',
      'Handle expense reporting',
      'Maintain contact databases',
      'Support project management'
    ],
    requirements: [
      '3+ years of EA experience',
      'Strong administrative skills',
      'Excellent time management',
      'Proficiency in office software',
      'Attention to detail',
      'Professional communication'
    ],
    severity: 'high'
  },
  // Admin Support positions
  {
    title: 'Administrative Coordinator',
    category: 'Admin Support',
    description: 'Coordinate administrative tasks and support team operations. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Handle general administrative tasks',
      'Manage office supplies and inventory',
      'Coordinate team schedules',
      'Process documentation',
      'Support HR functions',
      'Maintain filing systems'
    ],
    requirements: [
      '2+ years of admin experience',
      'Strong organizational skills',
      'Proficiency in MS Office',
      'Excellent communication',
      'Attention to detail',
      'Time management skills'
    ],
    severity: 'high'
  },
  {
    title: 'Office Administrator',
    category: 'Admin Support',
    description: 'Provide administrative support to ensure smooth office operations. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Handle incoming communications',
      'Maintain office records',
      'Process invoices and expenses',
      'Coordinate with vendors',
      'Support team members',
      'Manage office supplies'
    ],
    requirements: [
      '1+ year of admin experience',
      'Basic accounting knowledge',
      'Proficiency in office software',
      'Good communication skills',
      'Organizational abilities',
      'Team player mindset'
    ],
    severity: 'high'
  },
  // Architect positions
  {
    title: 'Remote Architect',
    category: 'Designers',
    description: 'Design and oversee architectural projects for UK clients. Remote position with site visits as needed.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Create architectural designs and plans',
      'Develop project specifications',
      'Coordinate with clients and contractors',
      'Ensure compliance with regulations',
      'Manage project timelines',
      'Conduct site visits when required'
    ],
    requirements: [
      'RIBA qualification',
      '5+ years of architectural experience',
      'Proficiency in CAD software',
      'Knowledge of UK building regulations',
      'Project management skills',
      'Strong design portfolio'
    ],
    severity: 'high'
  },
  {
    title: 'Architectural Designer',
    category: 'Designers',
    description: 'Create innovative architectural designs for residential and commercial projects. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Develop architectural concepts',
      'Create detailed design drawings',
      'Prepare presentation materials',
      'Collaborate with design team',
      'Review and revise designs',
      'Maintain design documentation'
    ],
    requirements: [
      'Architecture degree',
      '3+ years of design experience',
      'Proficiency in design software',
      'Strong creative abilities',
      'Knowledge of building codes',
      'Portfolio of work'
    ],
    severity: 'high'
  },
  // Finance positions
  {
    title: 'Financial Analyst',
    category: 'Finance & Bookkeeping',
    description: 'Analyze financial data and provide insights to support business decisions. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Conduct financial analysis and forecasting',
      'Prepare financial reports and presentations',
      'Monitor market trends and economic indicators',
      'Develop financial models and projections',
      'Support strategic planning initiatives',
      'Collaborate with cross-functional teams'
    ],
    requirements: [
      'Bachelor\'s degree in Finance or related field',
      '3+ years of financial analysis experience',
      'Strong analytical and problem-solving skills',
      'Proficiency in financial modeling',
      'Experience with financial software',
      'Excellent communication skills'
    ],
    severity: 'high'
  },
  {
    title: 'Investment Analyst',
    category: 'Finance & Bookkeeping',
    description: 'Research and analyze investment opportunities for UK-based clients. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Conduct market and investment research',
      'Analyze financial statements and reports',
      'Prepare investment recommendations',
      'Monitor portfolio performance',
      'Track market trends and developments',
      'Present findings to stakeholders'
    ],
    requirements: [
      'CFA or relevant financial certification',
      '4+ years of investment analysis experience',
      'Strong knowledge of financial markets',
      'Proficiency in financial analysis tools',
      'Excellent research skills',
      'Strong presentation abilities'
    ],
    severity: 'high'
  },
  // Engineering positions
  {
    title: 'Software Engineer',
    category: 'Engineering',
    description: 'Develop and maintain software solutions for UK-based clients. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Design and develop software applications',
      'Write clean, maintainable code',
      'Collaborate with cross-functional teams',
      'Debug and troubleshoot issues',
      'Implement new features and improvements',
      'Participate in code reviews'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of software development experience',
      'Proficiency in multiple programming languages',
      'Experience with software development methodologies',
      'Strong problem-solving skills',
      'Excellent communication abilities'
    ],
    severity: 'high'
  },
  {
    title: 'DevOps Engineer',
    category: 'Engineering',
    description: 'Manage and optimize cloud infrastructure for UK-based organizations. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Design and implement CI/CD pipelines',
      'Manage cloud infrastructure',
      'Automate deployment processes',
      'Monitor system performance',
      'Implement security best practices',
      'Collaborate with development teams'
    ],
    requirements: [
      '3+ years of DevOps experience',
      'Strong knowledge of cloud platforms',
      'Experience with containerization',
      'Proficiency in automation tools',
      'Understanding of security principles',
      'Excellent troubleshooting skills'
    ],
    severity: 'high'
  },
  // Operations positions
  {
    title: 'Operations Manager',
    category: 'Operations',
    description: 'Oversee and optimize business operations for UK-based companies. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Develop and implement operational strategies',
      'Monitor and improve business processes',
      'Manage cross-functional teams',
      'Track key performance indicators',
      'Identify areas for improvement',
      'Ensure operational efficiency'
    ],
    requirements: [
      '5+ years of operations management experience',
      'Strong leadership skills',
      'Experience with process improvement',
      'Excellent analytical abilities',
      'Project management expertise',
      'Strong communication skills'
    ],
    severity: 'high'
  },
  {
    title: 'Supply Chain Coordinator',
    category: 'Operations',
    description: 'Coordinate supply chain activities for UK-based businesses. Remote position.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage supplier relationships',
      'Track inventory levels',
      'Coordinate logistics operations',
      'Monitor supply chain performance',
      'Resolve supply chain issues',
      'Implement process improvements'
    ],
    requirements: [
      '3+ years of supply chain experience',
      'Knowledge of logistics operations',
      'Experience with inventory management',
      'Strong organizational skills',
      'Problem-solving abilities',
      'Excellent communication skills'
    ],
    severity: 'high'
  },
  {
    title: 'Independent Social Worker',
    category: 'Social Work',
    description: 'Join our network to conduct fostering, adoption, and safeguarding assessments across UK regions.',
    locations: ['London', 'Manchester', 'Norwich', 'Bristol', 'Sheffield', 'Luton', 'Blackpool', 'Wolverhampton', 'York', 'Colchester'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant (UK)',
    category: 'Planning',
    description: 'Join our planning team to help shape sustainable urban development.',
    locations: ['London', 'Manchester', 'Birmingham'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Prepare and submit planning applications',
      'Conduct site assessments',
      'Liaise with local authorities',
      'Prepare planning reports'
    ],
    requirements: [
      'Degree in Planning or related field',
      'RTPI membership',
      'Experience in UK planning system',
      'Strong communication skills'
    ],
    severity: 'medium'
  },
  {
    title: 'Remote Virtual Assistant',
    category: 'Administrative',
    description: 'Support our clients with administrative tasks remotely.',
    locations: ['Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Manage email correspondence',
      'Schedule meetings and appointments',
      'Prepare documents and reports',
      'Handle data entry tasks'
    ],
    requirements: [
      '2+ years administrative experience',
      'Proficiency in Microsoft Office',
      'Excellent communication skills',
      'Strong organizational abilities'
    ],
    severity: 'low'
  },
  {
    title: 'Junior Frontend Developer',
    category: 'Technology',
    description: 'Build modern web applications with React and TypeScript.',
    locations: ['London', 'Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Develop responsive web interfaces',
      'Implement UI/UX designs',
      'Write clean, maintainable code',
      'Collaborate with backend developers'
    ],
    requirements: [
      '1+ years React experience',
      'Knowledge of TypeScript',
      'Understanding of web standards',
      'Git version control'
    ],
    severity: 'medium'
  },
  {
    title: 'E-commerce Product Designer',
    category: 'Design',
    description: 'Create engaging product experiences for online retail.',
    locations: ['London', 'Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Design product listings',
      'Create marketing materials',
      'Optimize product images',
      'Maintain brand consistency'
    ],
    requirements: [
      'Experience in e-commerce design',
      'Proficiency in Adobe Creative Suite',
      'Understanding of UX principles',
      'Portfolio demonstrating work'
    ],
    severity: 'medium'
  },
  {
    title: 'UK Accountant (Freelance)',
    category: 'Finance',
    description: 'Provide accounting services to our diverse client base.',
    locations: ['London', 'Manchester'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Part-time',
    responsibilities: [
      'Prepare financial statements',
      'Handle tax returns',
      'Manage client accounts',
      'Provide financial advice'
    ],
    requirements: [
      'ACA/ACCA qualification',
      '5+ years accounting experience',
      'Knowledge of UK tax laws',
      'Strong analytical skills'
    ],
    severity: 'high'
  },
  {
    title: 'Customer Support Agent',
    category: 'Customer Support',
    description: 'Handle customer inquiries and provide technical support. Excellent communication skills required.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Handle customer inquiries',
      'Provide technical support',
      'Troubleshoot issues',
      'Maintain customer satisfaction'
    ],
    requirements: [
      'Excellent communication skills',
      'Problem-solving abilities',
      'Knowledge of products or services',
      'Patience and empathy'
    ],
    severity: 'high'
  },
  {
    title: 'Social Media Manager',
    category: 'Marketing',
    description: 'Manage social media presence and create engaging content. Experience with paid social campaigns required.',
    locations: ['Brighton', 'Bristol', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage social media accounts',
      'Create and publish content',
      'Engage with community',
      'Monitor and analyze performance'
    ],
    requirements: [
      'Experience with social media platforms',
      'Proficiency in content management tools',
      'Strategic thinking',
      'Creativity and design skills'
    ],
    severity: 'high'
  },
  {
    title: 'Sales Executive',
    category: 'Sales & BD',
    description: 'Drive business growth through new client acquisition. Strong negotiation skills required.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Develop new business opportunities',
      'Negotiate contracts',
      'Maintain client relationships',
      'Achieve sales targets'
    ],
    requirements: [
      'Strong negotiation skills',
      'Business development expertise',
      'Market knowledge',
      'Excellent communication'
    ],
    severity: 'high'
  },
  {
    title: 'Operations Coordinator',
    category: 'Operations',
    description: 'Coordinate daily operations and ensure smooth workflow. Experience with project management tools required.',
    locations: ['Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool', 'Newcastle'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Coordinate daily operations',
      'Manage workflow',
      'Use project management tools',
      'Ensure smooth workflow'
    ],
    requirements: [
      'Experience with project management tools',
      'Strong organizational skills',
      'Problem-solving abilities',
      'Excellent communication'
    ],
    severity: 'high'
  },
  {
    title: 'Project Manager',
    category: 'Project Management',
    description: 'Lead cross-functional teams and deliver projects on time. PMP certification preferred.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Lead project teams',
      'Plan and execute projects',
      'Monitor progress',
      'Manage resources'
    ],
    requirements: [
      'PMP certification',
      'Experience in project management',
      'Strong leadership skills',
      'Excellent communication'
    ],
    severity: 'high'
  },
  {
    title: 'Legal Admin Assistant',
    category: 'Legal',
    description: 'Support legal teams with administrative tasks. Knowledge of legal terminology required.',
    locations: ['Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool', 'Newcastle'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Handle legal documents',
      'Manage case files',
      'Coordinate with legal team',
      'Provide administrative support'
    ],
    requirements: [
      'Knowledge of legal terminology',
      'Strong organizational skills',
      'Attention to detail',
      'Excellent communication'
    ],
    severity: 'high'
  },
  {
    title: 'SEO Content Writer',
    category: 'Content Writing',
    description: 'Create SEO-optimized content for various industries. Strong research skills required.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Create SEO-optimized content',
      'Research industry trends',
      'Optimize content for search engines',
      'Collaborate with marketing team'
    ],
    requirements: [
      'Strong research skills',
      'Knowledge of SEO techniques',
      'Experience in content creation',
      'Excellent communication'
    ],
    severity: 'high'
  },
  {
    title: 'Data Entry Clerk',
    category: 'Administrative',
    description: 'Accurately process and maintain important business data.',
    locations: ['London', 'Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Enter data into systems',
      'Verify data accuracy',
      'Maintain records',
      'Generate reports'
    ],
    requirements: [
      'Fast typing speed',
      'Attention to detail',
      'Basic Excel knowledge',
      'Good communication skills'
    ],
    severity: 'low'
  },
  {
    title: 'Healthcare Virtual Assistant',
    category: 'Healthcare',
    description: 'Support healthcare professionals with administrative tasks.',
    locations: ['Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Schedule patient appointments',
      'Manage medical records',
      'Handle insurance claims',
      'Coordinate with healthcare providers'
    ],
    requirements: [
      'Healthcare administration experience',
      'Knowledge of medical terminology',
      'HIPAA compliance understanding',
      'Strong organizational skills'
    ],
    severity: 'high'
  },
  {
    title: 'Technical Support Engineer',
    category: 'Technology',
    description: 'Provide technical assistance to our clients and team.',
    locations: ['London', 'Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Troubleshoot technical issues',
      'Provide customer support',
      'Document solutions',
      'Train users on systems'
    ],
    requirements: [
      '2+ years technical support experience',
      'Knowledge of common software',
      'Problem-solving skills',
      'Excellent communication'
    ],
    severity: 'medium'
  },
  {
    title: 'HR Specialist',
    category: 'Human Resources',
    description: 'Manage HR processes and support employee relations.',
    locations: ['London'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Handle recruitment processes',
      'Manage employee records',
      'Coordinate training programs',
      'Support HR policies'
    ],
    requirements: [
      'CIPD qualification',
      '3+ years HR experience',
      'Knowledge of employment law',
      'Strong interpersonal skills'
    ],
    severity: 'high'
  },
  {
    title: 'Education Outreach Officer',
    category: 'Education',
    description: 'Connect educational institutions with opportunities.',
    locations: ['London', 'Manchester'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Develop educational partnerships',
      'Organize outreach programs',
      'Coordinate with schools',
      'Track program outcomes'
    ],
    requirements: [
      'Education sector experience',
      'Project management skills',
      'Strong communication abilities',
      'Passion for education'
    ],
    severity: 'medium'
  },
  {
    title: 'Logistics Coordinator',
    category: 'Logistics',
    description: 'Manage supply chain and logistics operations.',
    locations: ['London'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Coordinate shipments',
      'Track deliveries',
      'Manage inventory',
      'Optimize logistics processes'
    ],
    requirements: [
      '2+ years logistics experience',
      'Knowledge of supply chain',
      'Problem-solving skills',
      'Strong organizational abilities'
    ],
    severity: 'medium'
  },
  {
    title: 'UX Designer',
    category: 'Design',
    description: 'Create intuitive and engaging user experiences.',
    locations: ['London', 'Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Design user interfaces',
      'Conduct user research',
      'Create wireframes',
      'Test and iterate designs'
    ],
    requirements: [
      '3+ years UX design experience',
      'Portfolio of work',
      'Knowledge of design tools',
      'Understanding of user psychology'
    ],
    severity: 'high'
  },
  {
    title: 'Real Estate Admin VA',
    category: 'Real Estate',
    description: 'Support real estate professionals with administrative tasks.',
    locations: ['Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Manage property listings',
      'Handle client communications',
      'Prepare property documents',
      'Coordinate viewings'
    ],
    requirements: [
      'Real estate experience',
      'Strong administrative skills',
      'Knowledge of property market',
      'Excellent communication'
    ],
    severity: 'medium'
  },
  {
    title: 'Remote Business Analyst',
    category: 'Business',
    description: 'Analyze business processes and recommend improvements.',
    locations: ['Remote'],
    email: 'careers@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time',
    responsibilities: [
      'Analyze business processes',
      'Create process documentation',
      'Identify improvement opportunities',
      'Present findings to stakeholders'
    ],
    requirements: [
      '3+ years business analysis experience',
      'Strong analytical skills',
      'Process improvement knowledge',
      'Excellent communication'
    ],
    severity: 'high'
  }
]

// Generate additional job listings for Social Worker and Planning Consultant
const additionalJobListings: Job[] = [
  // Social Worker positions
  ...ukLocations.slice(0, 10).map(location => ({
    title: 'Social Worker',
    category: 'Social Work',
    description: 'Provide social work services to vulnerable individuals and families. Must be available during UK business hours.',
    locations: [location],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Conduct assessments and write reports',
      'Work with children and families',
      'Liaise with other professionals',
      'Maintain accurate records',
      'Follow safeguarding procedures',
      'Attend court hearings when required'
    ],
    requirements: [
      'Social Work degree and registration',
      '3+ years of experience',
      'Knowledge of UK social work practices',
      'Strong assessment skills',
      'Excellent communication abilities',
      'Ability to work independently'
    ],
    severity: 'high'
  })),
  // Planning Consultant positions
  ...ukLocations.slice(0, 10).map(location => ({
    title: 'Planning Consultant',
    category: 'Planning',
    description: 'Provide planning and development advice to clients. Must be available during UK business hours.',
    locations: [location],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Prepare planning applications',
      'Conduct site assessments',
      'Liaise with local authorities',
      'Provide planning advice',
      'Manage client relationships',
      'Prepare planning reports'
    ],
    requirements: [
      'Planning degree or related qualification',
      '3+ years of planning experience',
      'Knowledge of UK planning regulations',
      'Strong communication skills',
      'Project management abilities',
      'Client relationship experience'
    ],
    severity: 'high'
  })),
  {
    title: 'Independent Social Worker',
    category: 'Social Work',
    description: 'Provide professional social work services to children and families. Must be available during UK business hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Conduct assessments and write reports',
      'Work with children and families',
      'Liaise with other professionals',
      'Maintain accurate records',
      'Follow safeguarding procedures',
      'Attend court hearings when required'
    ],
    requirements: [
      'Social Work degree and registration',
      '3+ years of experience',
      'Knowledge of UK social work practices',
      'Strong assessment skills',
      'Excellent communication abilities',
      'Ability to work independently'
    ],
    severity: 'high'
  },
  {
    title: 'Social Worker',
    category: 'Social Work',
    description: 'Support vulnerable individuals and families. Remote position with UK hours.',
    locations: ['Remote'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Provide social work support',
      'Conduct assessments',
      'Develop care plans',
      'Work with multi-disciplinary teams',
      'Maintain case records',
      'Follow safeguarding procedures'
    ],
    requirements: [
      'Social Work qualification',
      '2+ years of experience',
      'Knowledge of social work practices',
      'Strong communication skills',
      'Ability to work remotely',
      'UK registration'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant – Edinburgh',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Mix of remote + site visits.',
    locations: ['Edinburgh', 'Cardiff', 'Belfast', 'Brighton', 'Oxford', 'Cambridge', 'Bath', 'Chester', 'Durham', 'Stirling'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant – Glasgow',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Mix of remote + site visits.',
    locations: ['Glasgow', 'Liverpool', 'Nottingham', 'Southampton', 'Portsmouth', 'Plymouth', 'Swansea', 'Aberdeen', 'Dundee', 'Inverness'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant – Leeds',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Mix of remote + site visits.',
    locations: ['Leeds', 'Bristol', 'Newcastle', 'Sheffield', 'Hull', 'Derby', 'Stoke', 'Preston', 'Middlesbrough', 'Huddersfield'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant – Manchester',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Mix of remote + site visits.',
    locations: ['Manchester', 'Birmingham', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Glasgow', 'Liverpool', 'Newcastle'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Planning Consultant – Birmingham',
    category: 'Planning & Urban Dev',
    description: 'Work on planning consultation for public and private clients. Mix of remote + site visits.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Independent Social Worker – Edinburgh',
    category: 'Social Work',
    description: 'Join our network to conduct fostering, adoption, and safeguarding assessments across UK regions.',
    locations: ['Brighton', 'Bristol', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast', 'Birmingham', 'Leeds', 'Glasgow', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Independent Social Worker – Glasgow',
    category: 'Social Work',
    description: 'Join our network to conduct fostering, adoption, and safeguarding assessments across UK regions.',
    locations: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  },
  {
    title: 'Independent Social Worker – Cardiff',
    category: 'Social Work',
    description: 'Join our network to conduct fostering, adoption, and safeguarding assessments across UK regions.',
    locations: ['Manchester', 'Birmingham', 'Glasgow', 'Edinburgh', 'Cardiff', 'Belfast', 'Bristol', 'Leeds', 'Liverpool', 'Newcastle'],
    email: 'info@focusrecruitment.co.uk',
    phone: '02039473993',
    hours: 'Full-time (UK hours)',
    responsibilities: [
      'Manage end-to-end accounting processes',
      'Prepare and review financial statements',
      'Handle tax planning and compliance'
    ],
    requirements: [
      'Qualified accountant',
      '3+ years of experience',
      'Strong knowledge of UK accounting standards'
    ],
    severity: 'high'
  }
]

const jobListings: Job[] = [...baseJobListings, ...additionalJobListings]

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locationSearchQuery, setLocationSearchQuery] = useState('')
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
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
  const locationDropdownRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  // Filter jobs based on search, category, and location
  const filteredJobs = jobListings.filter(job => {
    // Search query filter (case-insensitive)
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = !selectedCategory || job.category === selectedCategory

    // Location filter
    const matchesLocation = !selectedLocation || job.locations.includes(selectedLocation)

    // Return true only if ALL active filters match
    return matchesSearch && matchesCategory && matchesLocation
  })

  // Filter locations based on search - show all items
  const filteredLocations = ukLocations.filter(location =>
    location.toLowerCase().includes(locationSearchQuery.toLowerCase())
  )

  // Pagination
  const jobsPerPage = 9
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  )

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedLocation])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Close location dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsLocationDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedLocation(null)
    setLocationSearchQuery('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Explore Remote & On-Site Jobs Across the UK
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Find your next opportunity with leading companies nationwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="w-full md:w-1/3 relative" ref={locationDropdownRef}>
              <div
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer flex items-center justify-between"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              >
                <span className="text-gray-700">
                  {selectedLocation || 'Select Location'}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isLocationDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isLocationDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search locations..."
                      value={locationSearchQuery}
                      onChange={(e) => setLocationSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {locationSearchQuery === '' && (
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-gray-700"
                        onClick={() => {
                          setSelectedLocation(null)
                          setIsLocationDropdownOpen(false)
                          setLocationSearchQuery('')
                        }}
                      >
                        All Locations
                      </div>
                    )}
                    {filteredLocations.map((location) => (
                      <div
                        key={location}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          location === 'London' || location === 'Remote' ? 'font-semibold' : ''
                        }`}
                        onClick={() => {
                          setSelectedLocation(location)
                          setIsLocationDropdownOpen(false)
                          setLocationSearchQuery('')
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Clear Filters
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Jobs
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12" ref={sectionRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            {paginatedJobs.map((job) => (
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
                    <span className="text-sm text-gray-600">{job.hours}</span>
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
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                Previous
              </motion.button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-dark'
                }`}
              >
                Next
              </motion.button>
            </div>
          )}
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