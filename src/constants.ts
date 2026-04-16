import { Property, Service, Locality, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Sky Villa',
    location: 'DLF Phase 5, Gurugram',
    price: '₹12.5 Cr',
    type: 'Penthouse',
    beds: 4,
    baths: 5,
    area: '4,500 sq.ft',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200',
    description: 'An exquisite penthouse offering panoramic views of the Gurugram skyline. Designed for those who appreciate the finer things in life, this villa features double-height ceilings, a private plunge pool, and bespoke Italian marble flooring.',
    amenities: ['Private Elevator', 'Plunge Pool', 'Home Automation', 'Concierge Service', '4 Parking Slots'],
    highlights: ['Close to Golf Course Road', 'High-end Security', 'Premium Club Membership', 'Staff Quarters'],
    details: {
      'Project': 'DLF The Aralias',
      'Status': 'Ready to Move',
      'Facing': 'North-East',
      'Floor': '24th of 25',
      'Furnishing': 'Semi-Furnished'
    }
  },
  {
    id: '2',
    title: 'The Krisumi Heights',
    location: 'Golf Estate, Sector 65, Gurugram',
    price: '₹8.9 Cr',
    type: 'Luxury Apartment',
    beds: 3,
    baths: 4,
    area: '3,200 sq.ft',
    images: [
      '/modernist-estate-ext-1.webp',
      '/modernist-estate-ext-2.webp',
      '/Interior-Krisumi-aerial.webp',
      '/Interior-Krisumi-Bar-Area.webp',
      '/Interior-Krisumi-Dining-Finished.webp',
      '/Interior-Krisumi-Inside-Lift.webp',
      '/Interior-Krisumi-Lift-Lobby-2.webp',
      '/Interior-Krisumi-Lift-Lobby.webp',
      '/Interior-Krisumi-Living-Room.webp'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&q=80&w=1200',
    description: 'A contemporary masterpiece in the heart of Sector 65. This apartment blends minimalist aesthetics with functional luxury, featuring floor-to-ceiling windows and a wrap-around balcony.',
    amenities: ['Gymnasium', 'Swimming Pool', 'Spa', 'Tennis Court', 'Power Backup'],
    highlights: ['Direct Access to Golf Course', 'LEED Gold Certified', 'Award-winning Architecture'],
    details: {
      'Project': 'M3M Golf Estate',
      'Status': 'Under Construction',
      'Facing': 'Park Facing',
      'Floor': '12th of 40',
      'Furnishing': 'Bare Shell'
    }
  },
  {
    id: '3',
    title: 'Heritage Manor',
    location: 'Sunder Nagar, New Delhi',
    price: '₹45 Cr',
    type: 'Independent Bungalow',
    beds: 5,
    baths: 6,
    area: '8,000 sq.ft',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=80&w=1200'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200',
    description: 'A rare opportunity to own a piece of history in one of Delhi\'s most prestigious neighborhoods. This bungalow features a sprawling lawn, classic colonial architecture, and unmatched privacy.',
    amenities: ['Private Garden', 'Library', 'Wine Cellar', 'Servant Quarters', 'Gated Entry'],
    highlights: ['Lutyens Delhi Proximity', 'Quiet Cul-de-sac', 'Mature Landscaping'],
    details: {
      'Project': 'Independent',
      'Status': 'Resale',
      'Facing': 'East',
      'Floor': 'G+2',
      'Furnishing': 'Unfurnished'
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: 'brokerage',
    title: 'Brokerage',
    description: 'Expert guidance for buying, selling, and leasing premium residential and commercial assets.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
    fullDescription: 'Our brokerage services are built on the foundation of deep market knowledge and a commitment to transparency. Whether you are looking to acquire a luxury residence, sell a prime commercial asset, or lease high-end office space, our team provides end-to-end support to ensure a seamless transaction.',
    features: [
      'Residential Sales & Leasing',
      'Commercial Property Acquisition',
      'Exclusive Project Marketing',
      'Transaction Management',
      'Legal & Documentation Support'
    ],
    process: [
      { title: 'Requirement Analysis', description: 'Understanding your specific needs, budget, and location preferences.' },
      { title: 'Market Sourcing', description: 'Curating a list of properties that match your criteria from our exclusive database.' },
      { title: 'Site Visits', description: 'Coordinating private viewings and providing expert insights on each property.' },
      { title: 'Negotiation', description: 'Securing the best possible terms through strategic negotiation.' },
      { title: 'Closing', description: 'Handling all paperwork and legal formalities for a smooth handover.' }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio Management',
    description: 'Strategic real estate investment planning to maximize returns and diversify your wealth.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    fullDescription: 'We treat real estate as a critical asset class in your wealth portfolio. Our Portfolio Management Services (PMS) focus on identifying high-yield opportunities, managing risks, and ensuring long-term capital appreciation through strategic asset allocation.',
    features: [
      'Investment Strategy Development',
      'Asset Performance Monitoring',
      'Risk Assessment & Mitigation',
      'Diversification Planning',
      'Exit Strategy Execution'
    ],
    process: [
      { title: 'Portfolio Audit', description: 'Reviewing your current real estate holdings and performance.' },
      { title: 'Goal Setting', description: 'Defining short-term and long-term financial objectives.' },
      { title: 'Asset Selection', description: 'Identifying properties with high growth potential or rental yields.' },
      { title: 'Management', description: 'Ongoing monitoring and optimization of asset performance.' },
      { title: 'Reporting', description: 'Regular updates on portfolio value and market trends.' }
    ]
  },
  {
    id: 'research',
    title: 'Market Research',
    description: 'Data-driven insights and trend analysis to help you make informed real estate decisions.',
    icon: 'Search',
    image: 'https://images.unsplash.com/photo-1454165833767-02a6ed8a587a?auto=format&fit=crop&q=80&w=1200',
    fullDescription: 'In a dynamic market like Gurugram and Delhi NCR, data is your most valuable asset. Our research team provides comprehensive reports, feasibility studies, and trend analysis to help developers, investors, and occupiers make informed decisions.',
    features: [
      'Feasibility Studies',
      'Supply & Demand Analysis',
      'Pricing Trend Reports',
      'Competitor Benchmarking',
      'Location Analysis'
    ],
    process: [
      { title: 'Data Collection', description: 'Gathering primary and secondary market data from reliable sources.' },
      { title: 'Analysis', description: 'Using advanced analytics to identify patterns and opportunities.' },
      { title: 'Insight Generation', description: 'Translating data into actionable business intelligence.' },
      { title: 'Reporting', description: 'Delivering detailed reports tailored to your specific needs.' }
    ]
  },
  {
    id: 'nri',
    title: 'NRI Services',
    description: 'End-to-end support for non-resident Indians, from property search to legal compliance.',
    icon: 'Globe',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200',
    fullDescription: 'We understand the unique challenges faced by Non-Resident Indians when investing in Indian real estate. Our dedicated NRI desk provides a single window for all property-related needs, ensuring peace of mind and complete transparency.',
    features: [
      'Remote Property Management',
      'FEMA & RBI Compliance Advice',
      'Taxation Support (TDS/Capital Gains)',
      'Power of Attorney Services',
      'Virtual Site Tours'
    ],
    process: [
      { title: 'Consultation', description: 'Discussing investment goals and regulatory requirements.' },
      { title: 'Curation', description: 'Shortlisting properties suitable for NRI investment.' },
      { title: 'Legal Review', description: 'Ensuring all titles and documents are clear and compliant.' },
      { title: 'Execution', description: 'Managing the transaction remotely with secure digital processes.' }
    ]
  },
  {
    id: 'loan',
    title: 'Loan Services',
    description: 'Tailored financial solutions and seamless home loan processing with leading banks.',
    icon: 'CreditCard',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    fullDescription: 'Securing the right financing is as important as finding the right property. We partner with leading financial institutions to provide you with the most competitive interest rates and a hassle-free loan processing experience.',
    features: [
      'Home Loan Assistance',
      'Loan Against Property (LAP)',
      'Commercial Property Loans',
      'Balance Transfer Optimization',
      'Pre-approval Support'
    ],
    process: [
      { title: 'Eligibility Check', description: 'Assessing your borrowing capacity based on income and credit score.' },
      { title: 'Bank Selection', description: 'Comparing offers from multiple banks to find the best fit.' },
      { title: 'Documentation', description: 'Assisting with the collection and submission of required papers.' },
      { title: 'Sanction & Disbursement', description: 'Following up with the bank for timely approval and fund release.' }
    ]
  }
];

export const LOCALITIES: Locality[] = [
  {
    id: 'dlf-phase-5',
    name: 'DLF Phase 5',
    description: 'The pinnacle of luxury living in Gurugram, home to the iconic Golf Course Road.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'golf-course-ext',
    name: 'Golf Course Extension',
    description: 'A rapidly developing corridor featuring modern high-rises and premium amenities.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sunder-nagar',
    name: 'Sunder Nagar',
    description: 'An elite residential enclave in New Delhi known for its heritage and greenery.',
    image: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram Malhotra',
    role: 'CEO, Tech Solutions',
    content: 'The Corner Home team provided exceptional service. Their deep understanding of the Gurugram market helped us find our dream home in record time.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    role: 'NRI Investor',
    content: 'As an NRI, I was worried about the process, but their NRI services team handled everything seamlessly. Truly trustworthy and professional.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];
