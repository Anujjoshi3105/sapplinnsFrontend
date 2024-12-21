import {
  Leaf,
  BarChart2,
  TrendingUp,
  Droplet,
  PawPrintIcon as Paw,
  Globe2,
  PhoneCall,
  Mail,
  MapPin,
} from "lucide-react";
import {
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint,
} from "react-icons/fa";
import { FaChartBar, FaEnvelope, FaLeaf, FaPaw } from "react-icons/fa6";
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const FAQItems = [
  {
    question: "What is Sapplinns, and how does it enhance farming?",
    answer:
      "Sapplinns is an advanced agricultural platform that combines intelligent sensors with a user-friendly app to provide real-time insights into soil health, crop planning, and sustainable farming practices.",
  },
  {
    question: "How easy is it to set up Sapplinns on my farm?",
    answer:
      "Setting up Sapplinns is simple and hassle-free. The plug-and-play sensors are designed for quick installation, and the app guides you step-by-step to position and sync the sensors with your mobile device.",
  },
  {
    question: "Can Sapplinns help me optimize irrigation?",
    answer:
      "Yes! Sapplinns monitors soil moisture levels in real-time, allowing you to optimize irrigation schedules. This helps conserve water while ensuring crops get the hydration they need.",
  },
  {
    question: "Does Sapplinns provide personalized crop recommendations?",
    answer:
      "Absolutely. Sapplinns analyzes soil composition, weather patterns, and environmental factors to recommend the most suitable crops for your land, maximizing yield and profitability.",
  },
  {
    question: "Is Sapplinns compatible with organic farming methods?",
    answer:
      "Yes! Sapplinns supports organic farming by providing natural crop rotation suggestions, monitoring soil health, and helping minimize chemical usage for sustainable agricultural practices.",
  },
  {
    question: "How does Sapplinns help with pest and disease management?",
    answer:
      "Sapplinns detects early signs of pest infestations or crop diseases through real-time monitoring and sends alerts, enabling you to take timely preventive actions.",
  },
  {
    question: "Can Sapplinns adapt to different climates and soil types?",
    answer:
      "Yes, Sapplinns is highly versatile and designed to work across diverse climates and soil compositions, ensuring effective performance in any agricultural setting.",
  },
  {
    question: "How frequently can I receive updates from Sapplinns?",
    answer:
      "You can customize notifications to receive updates as frequently as you prefer—daily, weekly, or monthly summaries are available to suit your workflow.",
  },
  {
    question: "Does Sapplinns support crop rotation planning?",
    answer:
      "Yes, Sapplinns offers an intelligent crop rotation planner to maintain soil fertility and break pest cycles, ensuring long-term agricultural productivity.",
  },
  {
    question: "Is Sapplinns suitable for small and large farms?",
    answer:
      "Yes, Sapplinns is scalable and designed to meet the needs of both small-scale farmers and large agricultural enterprises, providing actionable insights for any farm size.",
  },
];

export const footerLinks = [
  {
    title: "Explore",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Projects", href: "/services" },
      { title: "Events", href: "/services" },
      { title: "Community", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Tutorials", href: "/services" },
      { title: "Workshops", href: "/services" },
      { title: "Blogs", href: "/services" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
];

export const bottomLinks = [
  { title: "Privacy Policy", href: "/contact" },
  { title: "Terms & Conditions", href: "/contact" },
  { title: "Support", href: "/contact" },
];

export const quotes = [
  {
    author: "Mahatma Gandhi",
    quote:
      "To forget how to dig the earth and tend the soil is to forget ourselves.",
  },
  {
    author: "Sunderlal Bahuguna",
    quote: "Ecology is the permanent economy.",
  },
  {
    author: "Rabindranath Tagore",
    quote: "The soil is our mother; it nourishes us.",
  },
  {
    author: "M. S. Swaminathan",
    quote:
      "If agriculture goes wrong, nothing else will have a chance to go right.",
  },
  {
    author: "Chanakya",
    quote:
      "A person who is engaged in agriculture lives a prosperous and happy life.",
  },
  {
    author: "Indian Proverb",
    quote: "The land is not just dirt; it is the lifeblood of our country.",
  },
  {
    author: "Baba Amte",
    quote: "Sustainable farming is the path to a stronger nation.",
  },
  {
    author: "Verghese Kurien",
    quote: "India’s true strength lies in the hands of its farmers.",
  },
  {
    author: "Lal Bahadur Shastri",
    quote:
      "Jai Jawan Jai Kisan: The soldier and the farmer are the pride of our nation.",
  },
  {
    author: "Indian Saying",
    quote: "When you take care of the land, it will take care of you.",
  },
];

export const servicesInfo = [
  {
    title: "Soil Health Monitoring",
    description:
      "Advanced sensors continuously track key soil parameters like moisture, pH, and nutrient levels. This real-time data empowers farmers to actively manage soil health for optimal crop growth.",
    icon: Leaf,
    features: [
      "24/7 soil monitoring",
      "Real-time pH tracking",
      "Nutrient level analysis",
      "Moisture content monitoring",
      "Custom alerts and notifications",
    ],
  },
  {
    title: "Nutrient Analysis",
    description:
      "Analyze soil nutrient composition and get personalized fertilization advice, helping farmers reduce waste and improve crop productivity.",
    icon: BarChart2,
    features: [
      "Detailed nutrient reports",
      "Fertilization recommendations",
      "Seasonal tracking",
      "Waste reduction insights",
      "Productivity optimization",
    ],
  },
  {
    title: "Predictive Crop Analysis",
    description:
      "AI-powered tools forecast crop yields using historical data and soil health parameters, enabling better harvest planning and increased returns.",
    icon: TrendingUp,
    features: [
      "AI yield predictions",
      "Historical data analysis",
      "Harvest planning tools",
      "ROI forecasting",
      "Market trend integration",
    ],
  },
  {
    title: "Water Usage Optimization",
    description:
      "Real-time insights into soil moisture levels guide efficient irrigation practices, reducing water wastage and improving crop hydration.",
    icon: Droplet,
    features: [
      "Smart irrigation planning",
      "Water usage analytics",
      "Drought prevention",
      "Resource optimization",
      "Sustainability metrics",
    ],
  },
  {
    title: "Pest and Disease Alerts",
    description:
      "Leverage smart monitoring systems to detect early signs of pests and diseases, ensuring timely action and healthier crops.",
    icon: Paw,
    features: [
      "Early warning system",
      "Disease identification",
      "Treatment recommendations",
      "Risk assessment",
      "Prevention strategies",
    ],
  },
  {
    title: "Sustainability Insights",
    description:
      "Encourage eco-friendly practices by optimizing soil health and reducing chemical inputs, supporting long-term agricultural sustainability.",
    icon: Globe2,
    features: [
      "Environmental impact tracking",
      "Chemical usage optimization",
      "Sustainable practice guides",
      "Carbon footprint monitoring",
      "Eco-certification support",
    ],
  },
];
export enum PopularPlan {
  NO = 0,
  YES = 1,
}

export interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

export const plans: PlanProps[] = [
  {
    title: "Basic",
    popular: PopularPlan.NO,
    price: 29,
    description: "Essential AgriTech tools for small farms and beginners.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Basic soil monitoring",
      "Limited nutrient analysis",
      "Basic crop analysis",
      "Water usage tracking",
      "Basic pest & disease alerts",
    ],
  },
  {
    title: "Pro",
    popular: PopularPlan.YES,
    price: 99,
    description:
      "Advanced AgriTech features for medium-sized farms and experienced growers.",
    buttonText: "Get Started",
    benefitList: [
      "Advanced soil monitoring",
      "Comprehensive nutrient analysis",
      "Detailed crop analysis",
      "Smart water management",
      "Real-time pest & disease alerts",
    ],
  },
  {
    title: "Enterprise",
    popular: PopularPlan.NO,
    price: 299,
    description:
      "Comprehensive AgriTech solution for large-scale farming operations.",
    buttonText: "Contact Us",
    benefitList: [
      "Premium soil monitoring & forecasting",
      "AI-powered nutrient optimization",
      "Predictive crop analysis",
      "Advanced water conservation tools",
      "Custom pest & disease management",
    ],
  },
];

export const contactInfo = [
  {
    href: "tel:+918447512857",
    icon: PhoneCall,
    label: "Any questions? Reach us at",
    value: "(+91) 8447512857",
  },
  {
    href: "mailto:sapplinns@gmail.com",
    icon: Mail,
    label: "Email",
    value: "sapplinns@gmail.com",
  },
  {
    href: "https://maps.google.com/?q=Faridabad%2CHaryana",
    icon: MapPin,
    label: "Location",
    value: "Faridabad, Haryana",
  },
];

export const features = [
  {
    icon: FaLeaf,
    title: "Soil Health Monitoring",
    description:
      "Advanced sensors continuously track key soil parameters like moisture, pH, and nutrient levels. This real-time data empowers farmers to actively manage soil health for optimal crop growth.",
  },
  {
    icon: FaChartBar,
    title: "Nutrient Analysis",
    description:
      "Analyze soil nutrient composition and get personalized fertilization advice, helping farmers reduce waste and improve crop productivity.",
  },
  {
    icon: FaChartBar,
    title: "Predictive Crop Analysis",
    description:
      "AI-powered tools forecast crop yields using historical data and soil health parameters, enabling better harvest planning and increased returns.",
  },
  {
    icon: FaTint,
    title: "Water Usage Optimization",
    description:
      "Real-time insights into soil moisture levels guide efficient irrigation practices, reducing water wastage and improving crop hydration.",
  },
  {
    icon: FaPaw,
    title: "Pest and Disease Alerts",
    description:
      "Leverage smart monitoring systems to detect early signs of pests and diseases, ensuring timely action and healthier crops.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Sustainability Insights",
    description:
      "Encourage eco-friendly practices by optimizing soil health and reducing chemical inputs, supporting long-term agricultural sustainability.",
  },
];

export const about = [
  {
    title: "100% Organic Practices",
    description:
      "Our farm embraces organic methods, ensuring healthy crops free from synthetic fertilizers and pesticides.",
  },
  {
    title: "Innovative Farming Techniques",
    description:
      "We utilize cutting-edge tools and strategies to maximize yield while preserving the environment.",
  },
  {
    title: "Sustainable Agriculture",
    description:
      "Committed to eco-friendly practices, we focus on soil health, water conservation, and biodiversity.",
  },
  {
    title: "Community Support",
    description:
      "We empower local communities by sourcing and promoting fresh, farm-grown produce.",
  },
];

export const contactDetails = [
  {
    title: "Call Us Now",
    subtitle: "+918447512857",
    icon: FaPhoneAlt,
    link: "tel:+918447512857",
  },
  {
    title: "Email",
    subtitle: "sapplinns@gmail.com",
    icon: FaEnvelope,
    link: "mailto:sapplinns@gmail.com",
  },
  {
    title: "Visit Our Office",
    subtitle: "Faridabad, Haryana",
    icon: FaMapMarkerAlt,
    link: "https://www.google.com/maps",
  },
];

export const cropLabels = {
  Rice: 20,
  Maize: 11,
  Chickpea: 7,
  Kidneybeans: 9,
  MothBeans: 13,
  "Pigeon Peas": 18,
  Mungbean: 12,
  Blackgram: 2,
  Lentil: 19,
  Pomegranate: 3,
  Banana: 1,
  Mango: 0,
  Grapes: 21,
  Watermelon: 15,
  Muskmelon: 14,
  Apple: 10,
  Orange: 16,
  Papaya: 17,
  Coconut: 4,
  Cotton: 6,
  Jute: 8,
  Coffee: 5,
};
