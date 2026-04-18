import { Article, Property, Service, Locality, Testimonial } from './types';

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
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=70&w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=70&w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=70&w=800'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=70&w=800',
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
    floorPlan: 'https://images.unsplash.com/photo-1585128719715-46776b56a0d1?auto=format&fit=crop&q=70&w=800',
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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=70&w=800',
      'https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&q=70&w=800'
    ],
    floorPlan: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=70&w=800',
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
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=70&w=800'
  },
  {
    id: 'golf-course-ext',
    name: 'Golf Course Extension',
    description: 'A rapidly developing corridor featuring modern high-rises and premium amenities.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=70&w=800'
  },
  {
    id: 'sunder-nagar',
    name: 'Sunder Nagar',
    description: 'An elite residential enclave in New Delhi known for its heritage and greenery.',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=70&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Vikram Malhotra',
    role: 'CEO, Tech Solutions',
    content: 'The Corner House team provided exceptional service. Their deep understanding of the Gurugram market helped us find our dream home in record time.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=70&w=200'
  },
  {
    id: '2',
    name: 'Ananya Sharma',
    role: 'NRI Investor',
    content: 'As an NRI, I was worried about the process, but their NRI services team handled everything seamlessly. Truly trustworthy and professional.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=70&w=200'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'delhi-ncr-luxury-report-2026',
    category: 'Market Report',
    title: 'The 2026 Delhi NCR Luxury Report',
    subtitle: 'How ultra-premium residences outperformed the broader market by 18% — and what that means for the year ahead.',
    excerpt:
      'An inside look at how ultra-premium residences in Golf Course Road and Aerocity outperformed the broader market by 18% this year.',
    date: 'March 2026',
    datePublished: '2026-03-15',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=70&w=1000',
    author: {
      name: 'Saurabh Jain',
      role: 'Digital Marketing Automation Expert',
      image: '/saurabh-jain.png'
    },
    heroQuote:
      'The top 1% of Delhi NCR homes is no longer a price bracket — it is its own asset class, with its own rhythm, its own buyer, and its own rules.',
    sections: [
      {
        heading: 'A tale of two markets',
        paragraphs: [
          'In 2026, Delhi NCR did not have one residential market — it had two. The broader mid-premium segment grew a steady 7.4% year-on-year, roughly in line with inflation and wage growth. The ultra-premium segment — homes priced above ₹10 Cr — grew 18.2%, its strongest twelve months since the 2021 rebound.',
          'Much of that divergence was concentrated in a handful of micro-markets. DLF Phase 5 along Golf Course Road, Aerocity, and select pockets of Chattarpur accounted for over 62% of all transactions above ₹20 Cr. The rest of NCR — Noida, Greater Noida, Dwarka Expressway — saw healthy volumes but limited price discovery at the top end.'
        ]
      },
      {
        heading: 'Who is buying, and why',
        paragraphs: [
          'The buyer profile has sharpened. Three groups drove the top end: first, founders and CXOs who exited stakes in the 2024–25 IPO cycle; second, NRIs returning from the Gulf and Singapore on long-term relocation; third, legacy industrialist families consolidating primary residences into single premier addresses.',
          'Across all three, the common thread is privacy. Low-density projects — Camellias, Aralias, the new Krisumi Waterside towers — are trading at meaningful premiums over higher-density counterparts with comparable specifications. Buyers are quietly paying for fewer neighbours.'
        ]
      },
      {
        heading: 'What we expect for the year ahead',
        paragraphs: [
          'Supply at the top end will remain tight. Only seven projects across NCR are scheduled to deliver units above ₹15 Cr in 2026, and pre-launch interest is already covering 70% of planned inventory.',
          'Our base case: ultra-premium prices hold double-digit growth through H1 2026, moderating to high single digits as new supply comes online in H2. Farmhouse estates in Chattarpur and Westend Greens remain the dark horse — illiquid, but with the strongest five-year appreciation curve in the region.'
        ]
      }
    ],
    keyTakeaways: [
      'Ultra-premium NCR grew 18.2% vs. 7.4% for the broader market.',
      'Three micro-markets account for 62% of all ₹20 Cr+ transactions.',
      'Low-density projects command a measurable privacy premium.',
      'Top-end supply stays tight through H1 2026; expect further appreciation.'
    ],
    tags: ['Market Report', 'Golf Course Road', 'Aerocity', 'Ultra-Premium']
  },
  {
    id: 'farmhouse-investment-chattarpur',
    category: 'Investment Guide',
    title: 'Why Farmhouses in Chattarpur Are the New Heirloom Asset',
    subtitle: 'Privacy, acreage, and legacy value are pulling discerning families from apartments to farm estates.',
    excerpt:
      'Privacy, acreage, and legacy value — a closer look at why discerning families are pivoting from apartments to farm estates.',
    date: 'February 2026',
    datePublished: '2026-02-15',
    readTime: '8 min read',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=70&w=1000',
    author: {
      name: 'Saurabh Jain',
      role: 'Digital Marketing Automation Expert',
      image: '/saurabh-jain.png'
    },
    heroQuote:
      'A well-chosen farmhouse is not bought for a decade — it is bought for a generation. That changes how you evaluate everything about it.',
    sections: [
      {
        heading: 'Why the pivot is happening now',
        paragraphs: [
          'For the last fifteen years, the default trophy home in Delhi NCR was a high-floor apartment in a branded tower. In the last three years, that assumption has quietly broken. Families with the means to choose are increasingly opting for farm estates — two to four acres of private land, a bespoke main house, and quiet that money otherwise cannot buy within the city.',
          'The drivers are mostly cultural. Post-pandemic, buyers weight outdoor space and multi-generational living more heavily. Apartments cap at 8,000–10,000 sq ft of built-up area; a farm can comfortably host 15,000 sq ft across a main house and two guest cottages on the same plot.'
        ]
      },
      {
        heading: 'Where the real value sits',
        paragraphs: [
          'Chattarpur, Westend Greens, and Sultanpur form the core of the NCR farmhouse market. Within Chattarpur, the stretch along Mandi Road and the lanes off Rajokri Road have seen the tightest supply and the strongest price discovery.',
          'Land values in the premium Chattarpur belt have compounded at roughly 11% annually over the last decade — materially ahead of Gurugram apartment averages, though with thinner liquidity. Most trades happen off-market and quietly, which is both the friction and the appeal.'
        ]
      },
      {
        heading: 'What to check before you sign',
        paragraphs: [
          'Title is everything. A well-priced farmhouse with cloudy title is not an asset; it is a liability in waiting. Insist on a full 30-year title trace, verified conversion status where applicable, and a clean encumbrance certificate.',
          'Second, inspect the land itself. Setback compliance, tree cover, water table, and boundary walls all matter. A perfect house on a compromised plot is much harder to resell than a simpler house on a clean plot.'
        ]
      }
    ],
    keyTakeaways: [
      'Premium Chattarpur land has compounded at ~11% annually for a decade.',
      'Farmhouses typically offer 2–3x the usable built-up space of apartments.',
      'Off-market transactions dominate — representation matters more, not less.',
      'Title diligence is non-negotiable and should precede any commercial discussion.'
    ],
    tags: ['Investment Guide', 'Chattarpur', 'Farmhouses', 'Legacy']
  },
  {
    id: 'dlf-camellias-resale',
    category: 'Neighborhood',
    title: 'Inside DLF Camellias: The Resale Story No One Talks About',
    subtitle: 'What drives the quiet, off-market transactions in Gurugram\u2019s most exclusive address.',
    excerpt:
      'What drives the quiet, off-market transactions in Gurugram\u2019s most exclusive address — and how sellers secure the right buyer.',
    date: 'January 2026',
    datePublished: '2026-01-15',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=70&w=1000',
    author: {
      name: 'Saurabh Jain',
      role: 'Digital Marketing Automation Expert',
      image: '/saurabh-jain.png'
    },
    heroQuote:
      'At this address, the listing never hits a portal. The right apartment finds the right family through a handful of conversations — and never more.',
    sections: [
      {
        heading: 'The quietest market in Gurugram',
        paragraphs: [
          'DLF Camellias rarely sees a public listing. Of the 429 apartments in the tower cluster, fewer than a dozen change hands in a typical year — and almost none through public channels. The resale market here operates on introductions, discretion, and trust between a small circle of advisors.',
          'The result is a market that is illiquid by design. Owners are not in a hurry; buyers are expected to qualify themselves before a viewing is even arranged. Price discovery happens in the room, not on a portal.'
        ]
      },
      {
        heading: 'What moves the needle on price',
        paragraphs: [
          'Three factors dominate. First, the view: units overlooking the fairway and the Aravalli ridge trade at a 12–15% premium over equivalent units on the opposite side. Second, floor: the sweet spot is between the 18th and 30th floors — high enough for the view, low enough to avoid wind and elevator wait times.',
          'Third, and most underrated: the quality of the existing interior fit-out. A tastefully done 4BHK with high-end joinery can save a buyer eighteen months of renovation and regularly commands a premium that more than covers the original cost of the work.'
        ]
      },
      {
        heading: 'How we sell a Camellias apartment',
        paragraphs: [
          'Our process is deliberately slow. We start by understanding the seller\u2019s timeline and privacy requirements, then build a shortlist of pre-qualified buyers from our own network. The apartment never hits a portal.',
          'Viewings are scheduled with care, typically in the owner\u2019s absence and outside peak hours. The goal is not to maximise the number of eyes on the asset — it is to find the one family that will value it the most. That is how the best trades in this building get done.'
        ]
      }
    ],
    keyTakeaways: [
      'Fewer than a dozen Camellias units change hands in a typical year.',
      'View-facing units command a 12–15% premium over opposite-facing equivalents.',
      'High-quality existing interiors materially shorten time to close.',
      'Off-market representation is the norm, not the exception.'
    ],
    tags: ['Neighborhood', 'DLF Camellias', 'Golf Course Road', 'Off-Market']
  }
];
