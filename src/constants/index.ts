import type {
  Ability,
  CounterItem,
  ExpCard,
  HeroTitle,
  LogoIcon,
  NavLink,
  SectionConfigs,
  SocialImg,
  TechStackIcon,
  TechStackImg,
  Testimonial,
} from "@/constants/types";

const sectionConfigs: SectionConfigs = {
  navLinks: true,
  heroTitles: true,
  selfDescription: true,
  myWorksCounter: false,
  projectsShowCase: false,
  companiesLogoRow: false,
  abilities: true,
  techStackImgs: true,
  techStackIcons: true,
  experience: true,
  testimonials: false,
  socialImgs: true,
};

const navLinks: NavLink[] = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const heroTitles: HeroTitle[] = [
  {
    lines: ["Transforming", "into Scalable Solutions", "that Empower Businesses"],
    animatedTerms: ["Ideas", "Logic", "Architecture", "Code"],
  },
  {
    lines: ["Engineering", "with Precision and Purpose", "to Elevate User Experience"],
    animatedTerms: ["Interfaces", "Workflows", "Systems", "Results"],
  },
  {
    lines: ["Crafting", "that Scale with Your Vision", "and Perform at Any Level"],
    animatedTerms: ["Frontends", "Backends", "APIs", "Products"],
  },
  {
    lines: ["Shaping", "into Real Projects", "that Deliver Results"],
    animatedTerms: ["Ideas", "Concepts", "Designs", "Code"],
  },
  {
    lines: ["Building", "that Solve Real Problems", "with Proven Reliability"],
    animatedTerms: ["React Apps", "Angular Modules", "REST APIs", "Microservices"],
  },
  {
    lines: ["Delivering", "through Clean Code", "and Agile Execution"],
    animatedTerms: ["Quality", "Performance", "Maintainability", "Results"],
  },
  {
    lines: ["Mentoring", "to Foster Growth", "and Drive Engineering Excellence"],
    animatedTerms: ["Developers", "Teams", "Practices", "Culture"],
  },
];

const selfDescription: string =
  "Hi, I'm Sidath — a passionate Senior Software Engineer with over 5 years of experience building full-stack web applications. I specialize in creating scalable, high-performance solutions using modern frameworks like React, Angular, Node.js. Whether architecting systems or mentoring teams, I focus on delivering clean, maintainable code that translates ideas into impactful digital experiences.";

const counterItems: CounterItem[] = [
  {
    value: 5,
    suffix: "+",
    label: "Years of Experience",
  },
  {
    value: 200,
    suffix: "+",
    label: "Satisfied Clients",
  },
  {
    value: 108,
    suffix: "+",
    label: "Completed Projects",
  },
  {
    value: 90,
    suffix: "%",
    label: "Client Retention Rate",
  },
];

const logoIconsList: LogoIcon[] = [
  {
    imgPath: "/images/logos/company-logo-1.png",
    name: "company_logo_1",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
    name: "company_logo_2",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
    name: "company_logo_3",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
    name: "company_logo_4",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
    name: "company_logo_5",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
    name: "company_logo_6",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
    name: "company_logo_7",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
    name: "company_logo_8",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
    name: "company_logo_9",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
    name: "company_logo_10",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
    name: "company_logo_11",
  },
];

const abilities: Ability[] = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs: TechStackImg[] = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons: TechStackIcon[] = [
  {
    name: "React Developer",
    modelPath: "/models/react.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards: ExpCard[] = [
  {
    review:
      "Led front-end development initiatives across multiple high-value client projects, establishing architectural standards, and mentoring junior team members.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Senior Software Engineer",
    company: "FocalId Technologies (Pvt.) Ltd.",
    date: "November 2024 - May 2025",
    responsibilities: [
      "Architected and implemented reusable data visualization components using D3.js, ReCharts, and the React ecosystem, reducing development time for new dashboards by 40%.",
      "Established code quality standards across a few projects, resulting in a 25% reduction in reported bugs and improved sprint velocity.",
      "Implemented robust state management patterns using Redux and Context API, creating a predictable and maintainable application architecture.",
    ],
  },
  {
    review:
      "Collaborated with cross-functional teams to deliver responsive, high-performance frontend solutions while contributing to codebase improvements.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Software Engineer",
    company: "FocalId Technologies (Pvt.) Ltd.",
    date: "June 2024 - November 2024",
    responsibilities: [
      "Developed performance-optimized frontend components using modern JavaScript techniques, improving load times by 35% on key client applications.",
      "Created a custom annotation tool using vanilla JavaScript and jQuery that streamlined internal data labeling processes.",
      "Integrated solutions with open-source data platforms including N8N and DataHub, enhancing data analytics capabilities for enterprise clients.",
      "Actively participated in agile ceremonies and translated UI/UX designs into responsive implementations that received client commendation.",
    ],
  },
  {
    review:
      "Delivered full-stack solutions for client projects with a focus on scalable architecture and innovative features.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Software Engineer",
    company: "Simato Solutions (Pvt.) Ltd.",
    date: "June 2022 - June 2024",
    responsibilities: [
      "Contributed core functionality to the Appmaker platform, enabling 100+ businesses to create mobile applications with minimal technical knowledge.",
      "Implemented real-time chat and media streaming features for StarsLive platform, supporting 5K+ concurrent users during peak events.",
      "Resolved complex performance bottlenecks in Angular applications, improving response times by 40% on high-traffic modules such as P2Pchat template in Appmaker platform.",
      "Integrated Genie payment gateway and implemented end-to-end subscription flows for Dialog and Mobitel, handling MSISDN detection, subscription initiation, renewal callbacks, and status validation across both frontend and backend layers.",
      "Mentored a junior developer on best practices of full-stack development methodologies.",
      "Collaborated with senior developers to optimize database queries, reducing load times for data-heavy screens.",
    ],
  },
  {
    review:
      "Extended due to exceptional performance. Supported development teams across multiple client projects.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Software Engineer Intern",
    company: "Simato Solutions (Pvt.) Ltd.",
    date: "July 2020 - July 2021",
    responsibilities: [
      "Developed responsive UI components using AngularJS, Angular(2+), and Angular Material that were incorporated into production applications.",
      "Created reusable template components for the Appmaker platform that became standard offerings for new clients.",
      "Diagnosed and resolved bugs in existing Appmaker templates, improving stability and reducing support requests by streamlining reusable components.",
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs: SocialImg[] = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  sectionConfigs,
  heroTitles,
  selfDescription,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
