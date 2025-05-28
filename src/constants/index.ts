import type {
  Ability,
  CounterItem,
  ExpCard,
  ExpLogo,
  HeroTitleWord,
  LogoIcon,
  NavLink,
  SocialImg,
  TechStackIcon,
  TechStackImg,
  Testimonial,
} from "@/constants/types";

const navLinks: NavLink[] = [
  {
    name: "Work",
    link: "#work",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Experience",
    link: "#experience",
    configs: {
      show: true,
      enabled: true,
    },
  },
  {
    name: "Skills",
    link: "#skills",
    configs: {
      show: true,
      enabled: true,
    },
  },
  {
    name: "Testimonials",
    link: "#testimonials",
    configs: {
      show: true,
      enabled: true,
    },
  },
];

const heroTitleWords: HeroTitleWord[] = [
  {
    text: "Ideas",
    imgPath: "/images/ideas.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    text: "Concepts",
    imgPath: "/images/concepts.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    text: "Designs",
    imgPath: "/images/designs.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    text: "Code",
    imgPath: "/images/code.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const selfDescription: string =
  "Hi, I'm Sidath, a Senior Software Engineer with 5+ years of experience specializing in full-stack web and mobile application development. Expert in React/Angular ecosystems with proven ability to deliver scalable, high-performance solutions that drive business objectives. Skilled in mentoring junior developers and implementing best practices across the development lifecycle.";

const counterItems: CounterItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    value: 200,
    suffix: "+",
    label: "Satisfied Clients",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    value: 108,
    suffix: "+",
    label: "Completed Projects",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    value: 90,
    suffix: "%",
    label: "Client Retention Rate",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const logoIconsList: LogoIcon[] = [
  {
    imgPath: "/images/logos/company-logo-1.png",
    name: "company_logo_1",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
    name: "company_logo_2",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
    name: "company_logo_3",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
    name: "company_logo_4",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
    name: "company_logo_5",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
    name: "company_logo_6",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
    name: "company_logo_7",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
    name: "company_logo_8",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
    name: "company_logo_9",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
    name: "company_logo_10",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
    name: "company_logo_11",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const abilities: Ability[] = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const techStackImgs: TechStackImg[] = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const techStackIcons: TechStackIcon[] = [
  {
    name: "React Developer",
    modelPath: "/models/react.glb",
    scale: 1,
    rotation: [0, 0, 0],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Python Developer",
    modelPath: "/models/python.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Project Manager",
    modelPath: "/models/git.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const expCards: ExpCard[] = [
  {
    review:
      "Adrian brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    review:
      "Adrian’s contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    review:
      "Adrian’s work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const expLogos: ExpLogo[] = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

const socialImgs: SocialImg[] = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "x",
    imgPath: "/images/x.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    configs: {
      show: false,
      enabled: false,
    },
  },
];

export {
  heroTitleWords,
  selfDescription,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
