interface MetaInfo {
  title: string;
  description: string;
  keywords: string;
}

const meta: Record<string, MetaInfo> = {
  '/': {
    title: 'Amass Middle East Shipping Services LLC – Neutral LCL Consolidation',
    description:
      'Neutral LCL consolidation provider based in Oud Metha, Dubai with CFS in Jebel Ali. Expanded to Saudi Arabia (Dammam, Riyadh, Jeddah) with bonded warehouses in Jeddah & Dammam. Backed by 40+ professionals and the CWN global network.',
    keywords:
      'Amass Middle East, neutral LCL, consolidation, Jebel Ali CFS, Oud Metha Dubai, bonded warehouse, Dammam, Riyadh, Jeddah, CWN network, logistics UAE KSA',
  },

  '/contact': {
    title: 'Contact Amass Middle East',
    description:
      'Get in touch with Amass Middle East for neutral LCL consolidation, CFS operations, and regional logistics support across the UAE and Saudi Arabia.',
    keywords:
      'contact Amass, logistics support, UAE logistics, Saudi logistics, LCL, CFS',
  },

  '/services': {
    title: 'Amass Services',
    description:
      'Explore Amass Middle East’s core services including neutral LCL consolidation, CFS operations, warehousing, project cargo and more.',
    keywords:
      'Amass services, neutral LCL, CFS, warehousing, project cargo, logistics',
  },

  // --- Your primary services (added) ---
  '/services/lcl': {
    title: 'LCL Consolidation – Amass Middle East',
    description:
      'Neutral LCL consolidation with reliable sailings, competitive rates, and CWN-backed global reach from Dubai and KSA.',
    keywords:
      'LCL, less than container load, neutral consolidator, Dubai LCL, Jebel Ali LCL, CWN',
  },
  '/services/cfs': {
    title: 'CFS Operations – Amass Middle East',
    description:
      'Modern CFS at Jebel Ali supported by bonded warehouses in Jeddah and Dammam for faster throughput and reliable schedules.',
    keywords:
      'CFS, container freight station, Jebel Ali, bonded warehouse, Jeddah, Dammam',
  },

  // --- Keep existing routes (rebranded text) ---
  '/services/sea-freight': {
    title: 'Sea Freight – Amass Middle East',
    description:
      'Cost-effective FCL/LCL sea freight with dependable schedules across major tradelanes.',
    keywords:
      'sea freight, ocean shipping, FCL, LCL, logistics UAE, logistics KSA',
  },
  '/services/air-freight': {
    title: 'Air Freight – Amass Middle East',
    description:
      'Fast and reliable air cargo solutions for time-critical shipments, backed by regional expertise.',
    keywords:
      'air freight, air cargo, express shipping, UAE, KSA',
  },
  '/services/customs-clearance': {
    title: 'Customs Clearance – Amass Middle East',
    description:
      'Efficient customs brokerage and documentation across UAE and Saudi Arabia.',
    keywords:
      'customs clearance, brokerage, import export, GCC compliance',
  },
  '/services/warehousing': {
    title: 'Warehousing – Amass Middle East',
    description:
      'Secure storage, inventory control, and value-added services with bonded options in Jeddah and Dammam.',
    keywords:
      'warehousing, bonded warehouse, storage, VAS, Jeddah, Dammam',
  },
  '/services/consolidation': {
    title: 'Cargo Consolidation – Amass Middle East',
    description:
      'Optimize shipments with multi-origin consolidation and hub-and-spoke solutions.',
    keywords:
      'cargo consolidation, multi-origin, hub and spoke, LCL',
  },
  '/services/project-cargo': {
    title: 'Project Cargo – Amass Middle East',
    description:
      'End-to-end handling for oversized and complex moves across the region.',
    keywords:
      'project cargo, heavy lift, OOG, logistics projects',
  },
  '/services/liquid-cargo': {
    title: 'Liquid Cargo – Amass Middle East',
    description:
      'Safe and compliant liquid cargo transport with specialized handling.',
    keywords:
      'liquid cargo, ISO tank, bulk liquids, chemical logistics',
  },
  '/services/third-party-logistics': {
    title: 'Third-Party Logistics (3PL) – Amass Middle East',
    description:
      'Flexible 3PL solutions integrating warehousing, distribution, and value-added services.',
    keywords:
      '3PL, third party logistics, fulfillment, distribution',
  },
  '/services/liner-agency': {
    title: 'Liner Agency – Amass Middle East',
    description:
      'Professional liner representation and port operations support across key GCC gateways.',
    keywords:
      'liner agency, port operations, shipping lines, GCC',
  },

  '/global-presence': {
    title: 'Amass Global Presence',
    description:
      'Our footprint spans the UAE and Saudi Arabia with CWN network coverage worldwide.',
    keywords:
      'global presence, UAE, Saudi Arabia, CWN, logistics network',
  },

  '/about-us': {
    title: 'About Amass Middle East',
    description:
      'Neutral LCL specialist headquartered in Oud Metha, Dubai with CFS in Jebel Ali. 40+ professionals and 9 years of growth powered by the CWN network.',
    keywords:
      'about Amass, neutral LCL, Jebel Ali CFS, CWN network, Dubai logistics',
  },

  '/gallery': {
    title: 'Gallery – Amass Middle East',
    description:
      'A look at our consolidation, CFS operations, and project handling in the region.',
    keywords:
      'gallery, logistics images, CFS, LCL operations',
  },

  '/career': {
    title: 'Careers – Amass Middle East',
    description:
      'Join a growing regional consolidator and build your logistics career with Amass.',
    keywords:
      'careers, logistics jobs, UAE jobs, Saudi jobs',
  },

  '/blog': {
    title: 'Amass Insights',
    description:
      'Logistics insights, updates, and regional trade news from Amass Middle East.',
    keywords:
      'logistics blog, trade updates, shipping news',
  },

  '/news': {
    title: 'News – Amass Middle East',
    description:
      'Company announcements and regional logistics updates from Amass.',
    keywords:
      'Amass news, logistics news, GCC updates',
  },

  '/projects': {
    title: 'Projects – Amass Middle East',
    description:
      'Selected logistics projects and case studies showcasing our regional capabilities.',
    keywords:
      'projects, case studies, logistics projects',
  },

  '/privacy-policy': {
    title: 'Privacy Policy – Amass Middle East',
    description:
      'Read how Amass Middle East protects your data and privacy.',
    keywords:
      'privacy policy, data protection, Amass Middle East',
  },

  '/terms-and-conditions': {
    title: 'Terms & Conditions – Amass Middle East',
    description:
      'Terms for using Amass Middle East services and this website.',
    keywords:
      'terms and conditions, policies, Amass Middle East',
  },

  '/login': {
    title: 'Login – Amass Middle East',
    description: 'Access your Amass account and shipment information.',
    keywords: 'login, account, Amass',
  },
  '/signup': {
    title: 'Sign Up – Amass Middle East',
    description: 'Create your Amass account to manage bookings and documents.',
    keywords: 'signup, register, Amass account',
  },
  '/forgot-password': {
    title: 'Forgot Password – Amass Middle East',
    description: 'Reset your Amass account password.',
    keywords: 'password reset, account recovery, Amass',
  },

  '/dashboard': {
    title: 'Dashboard – Amass Middle East',
    description: 'Manage shipments, documents, and invoices in your Amass dashboard.',
    keywords: 'dashboard, shipments, documents, Amass',
  },

  '/admin-login': {
    title: 'Admin Login – Amass Middle East',
    description: 'Administrative access to Amass Middle East systems.',
    keywords: 'admin login, Amass admin',
  },
  '/admin-dashboard': {
    title: 'Admin Dashboard – Amass Middle East',
    description: 'Administration panel for Amass operations.',
    keywords: 'admin dashboard, management, Amass',
  },
  '/admin': {
    title: 'Admin Dashboard – Amass Middle East',
    description: 'Administration panel for Amass operations.',
    keywords: 'admin dashboard, management, Amass',
  },

  '/blog-editor': {
    title: 'Blog Editor – Amass Middle East',
    description: 'Create and edit Amass blog posts.',
    keywords: 'blog editor, CMS, Amass',
  },
  '/blog-admin': {
    title: 'Blog Admin – Amass Middle East',
    description: 'Administer blog content for Amass Middle East.',
    keywords: 'blog admin, content management, Amass',
  },

  '/not-found': {
    title: 'Page Not Found – Amass Middle East',
    description: 'The page you’re looking for could not be found.',
    keywords: '404, not found, Amass',
  },
};

export default meta;
