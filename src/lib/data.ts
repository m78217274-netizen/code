import {
  Award,
  Bath,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  Car,
  Castle,
  Dumbbell,
  Fence,
  Home,
  Landmark,
  MapPin,
  ShieldCheck,
  Trees,
  Wifi,
  Zap
} from "lucide-react";

export const companyName = "Lahore Properties";
export const contactEmail = "iqbalpu57@gmail.com";
export const phoneNumber = "+92 316 4855769";
export const phoneHref = "tel:+923164855769";
export const whatsappHref = "https://wa.me/923164855769";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Buy", href: "/properties?intent=buy" },
  { label: "Sell", href: "/contact" },
  { label: "Contact", href: "/contact" }
];

export const properties = [
  {
    slug: "skyline-residence",
    title: "Skyline Residence",
    price: "$1,240,000",
    location: "Downtown Waterfront",
    status: "For Sale",
    type: "Luxury Apartment",
    beds: 4,
    baths: 3,
    area: "3,250 sq ft",
    parking: "2 Cars",
    agent: "Senior Property Advisor",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A refined high-floor residence with panoramic city views, expansive living areas, premium finishes, and concierge-grade amenities."
  },
  {
    slug: "palm-estate-villa",
    title: "Palm Estate Villa",
    price: "$2,850,000",
    location: "Private Garden District",
    status: "Featured",
    type: "Villa",
    beds: 6,
    baths: 7,
    area: "7,900 sq ft",
    parking: "4 Cars",
    agent: "Luxury Homes Consultant",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A private contemporary villa designed for effortless entertaining, with generous suites, landscaped grounds, and resort-level privacy."
  },
  {
    slug: "capital-business-tower",
    title: "Capital Business Tower",
    price: "$890,000",
    location: "Financial Avenue",
    status: "Investment",
    type: "Commercial",
    beds: 0,
    baths: 2,
    area: "2,100 sq ft",
    parking: "Reserved",
    agent: "Commercial Specialist",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A strategic commercial suite in a landmark business address, ideal for stable rental income and long-term capital appreciation."
  },
  {
    slug: "greenview-family-home",
    title: "Greenview Family Home",
    price: "$720,000",
    location: "Oakline Community",
    status: "For Sale",
    type: "Residential",
    beds: 5,
    baths: 4,
    area: "4,600 sq ft",
    parking: "2 Cars",
    agent: "Residential Advisor",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A warm, elegant home in a secure community with bright interiors, practical storage, and excellent access to schools and retail."
  },
  {
    slug: "golden-acre-plot",
    title: "Golden Acre Plot",
    price: "$410,000",
    location: "North Expansion Zone",
    status: "Hot Offer",
    type: "Plot",
    beds: 0,
    baths: 0,
    area: "1 Acre",
    parking: "N/A",
    agent: "Land Investment Advisor",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A high-potential land parcel in a fast-growing corridor with strong development indicators and clean documentation."
  },
  {
    slug: "marina-penthouse",
    title: "Marina Penthouse",
    price: "$3,400,000",
    location: "Marina Promenade",
    status: "Premium",
    type: "Penthouse",
    beds: 5,
    baths: 6,
    area: "6,150 sq ft",
    parking: "3 Cars",
    agent: "Private Client Advisor",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85"
    ],
    description:
      "A statement penthouse with private terraces, water views, bespoke interiors, and a discreet ownership experience."
  }
];

export type Property = (typeof properties)[number];

export const categories = [
  {
    title: "Residential",
    count: "148 homes",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Commercial",
    count: "64 spaces",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Apartments",
    count: "210 listings",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Villas",
    count: "42 estates",
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Plots",
    count: "87 parcels",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Luxury Homes",
    count: "35 curated",
    image:
      "https://images.unsplash.com/photo-1600607688960-e095ff83135c?auto=format&fit=crop&w=900&q=85"
  }
];

export const amenities = [
  { label: "Parking", icon: Car },
  { label: "Security", icon: ShieldCheck },
  { label: "Electricity", icon: Zap },
  { label: "Water", icon: Landmark },
  { label: "Internet", icon: Wifi },
  { label: "Garden", icon: Trees },
  { label: "Pool", icon: Fence },
  { label: "Gym", icon: Dumbbell }
];

export const stats = [
  { label: "Properties Sold", value: "2,450+", icon: Home },
  { label: "Active Listings", value: "780+", icon: Building2 },
  { label: "Happy Clients", value: "1,900+", icon: Award },
  { label: "Years Experience", value: "18+", icon: BriefcaseBusiness }
];

export const faqs = [
  {
    question: "How do you help buyers choose the right property?",
    answer:
      "We shortlist verified options based on budget, lifestyle, documentation status, rental potential, and long-term market fundamentals."
  },
  {
    question: "What is required to sell a property?",
    answer:
      "Our team reviews ownership documents, pricing, photography, buyer qualification, negotiation terms, and closing support."
  },
  {
    question: "Do you verify property documentation?",
    answer:
      "Yes. Listings are reviewed for ownership, approvals, transfer requirements, and available supporting documentation before promotion."
  },
  {
    question: "Can you guide investment property decisions?",
    answer:
      "Yes. We evaluate rental yield, area growth, demand trends, exit liquidity, payment plans, and risk profile before recommending opportunities."
  }
];

export const team = [
  "Managing Partner",
  "Luxury Property Advisor",
  "Commercial Real Estate Lead",
  "Client Relations Manager"
];

export const categoryIcons = {
  Residential: Home,
  Commercial: Building2,
  Apartments: Landmark,
  Villas: Castle,
  Plots: MapPin,
  "Luxury Homes": Award,
  BedDouble,
  Bath
};
