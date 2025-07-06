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
  // {
  //   name: "Testimonials",
  //   link: "#testimonials",
  // },
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

const selfDescription =
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
    imgPath: "/images/company/shopify_logo.png",
    name: "shopify_logo",
  },
];

const abilities: Ability[] = [
  {
    imgPath: "/images/icons/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/icons/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/icons/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs: TechStackImg[] = [
  {
    name: "React Developer",
    imgPath: "/images/tech-logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/tech-logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/tech-logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/tech-logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/tech-logos/git.svg",
  },
];

const techStackIcons: TechStackIcon[] = [
  {
    id: "REACT",
    name: "React",
    modelPath: "/models/react.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    id: "NEXT",
    name: "Next.js",
    modelPath: "/models/nextjs.glb",
    scale: 0.165,
    rotation: [0, 0, 0],
  },
  {
    id: "ANGULAR",
    name: "Angular",
    modelPath: "/models/angular.glb",
    scale: 0.01,
    rotation: [0, 4.5, 0],
  },
  {
    id: "TAILWIND",
    name: "TailwindCSS",
    modelPath: "/models/tailwindcss.glb",
    scale: 0.1,
    rotation: [0, 0, 0],
  },
  {
    id: "BOOTSTRAP5",
    name: "Bootstrap",
    modelPath: "/models/boostrap5.glb",
    scale: 0.14,
    rotation: [0, 0, 0],
  },
  {
    id: "NODE",
    name: "Node.js",
    modelPath: "/models/node.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    id: "TYPESCRIPT",
    name: "TypeScript",
    modelPath: "/models/typescript.glb",
    scale: 0.15,
    rotation: [0, 0, 0],
  },
  {
    id: "SAILS",
    name: "Sails.js",
    modelPath: "/models/sails.glb",
    scale: 0.15,
    rotation: [0, 0, 0],
  },
  // {
  //   id: "PYTHON",
  //   name: "Python",
  //   modelPath: "/models/python.glb",
  //   scale: 0.8,
  //   rotation: [0, 0, 0],
  // },
  {
    id: "D3",
    name: "D3.js",
    modelPath: "/models/d3.glb",
    scale: 0.125,
    rotation: [0, 0, 0],
  },
  {
    id: "THREE",
    name: "Three.js",
    modelPath: "/models/three.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    id: "MONGO",
    name: "MongoDB",
    modelPath: "/models/mongo.glb",
    scale: 0.2,
    rotation: [0, 0, 0],
  },
  {
    id: "MYSQL",
    name: "MySQL",
    modelPath: "/models/mysql.glb",
    scale: 0.12,
    rotation: [0, Math.PI / 4, 0],
    position: [1.3, -0.75, 0],
  },
  {
    id: "VCS",
    name: "Version Control",
    modelPath: "/models/version_control.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
  {
    id: "GITHUB",
    name: "GitHub",
    modelPath: "/models/github.glb",
    scale: 0.15,
    rotation: [0, 0, 0],
  },
  {
    id: "GITLAB",
    name: "GitLab",
    modelPath: "/models/gitlab.glb",
    scale: 0.15,
    rotation: [0, 0, 0],
    position: [0, -0.5, 0],
  },
];

const expCards: ExpCard[] = [
  {
    review:
      "Led front-end development initiatives across multiple high-value client projects, establishing architectural standards, and mentoring junior team members.",
    imgPath: "/images/experience/simato.png",
    logoPath: "/images/experience/appmaker.svg",
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
    imgPath: "/images/experience/simato.png",
    logoPath: "/images/experience/appmaker.svg",
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
    imgPath: "/images/experience/simato.png",
    logoPath: "/images/experience/appmaker.svg",
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
    imgPath: "/images/experience/simato.png",
    logoPath: "/images/experience/appmaker.svg",
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
      "I can’t say enough good things about Sidath. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/person/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Sidath was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/person/client1.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Sidath was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Sidath's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Sidath is the ideal partner.",
    imgPath: "/images/person/client1.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Sidath was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/person/client1.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/person/client1.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Sidath was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/person/client1.png",
  },
];

const socialImgs: SocialImg[] = [
  {
    name: "insta",
    imgPath: "/images/social-media/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/social-media/fb.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/social-media/linkedin.png",
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
