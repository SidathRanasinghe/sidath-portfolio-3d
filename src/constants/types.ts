export type SectionConfigs = {
  navLinks: boolean;
  heroTitles: boolean;
  selfDescription: boolean;
  myWorksCounter: boolean;
  projectsShowCase: boolean;
  companiesLogoRow: boolean;
  abilities: boolean;
  techStackImgs: boolean;
  techStackIcons: boolean;
  experience: boolean;
  testimonials: boolean;
  socialImgs: boolean;
};

export type HeroTitle = {
  lines: string[];
  animatedTerms: string[];
};

export type NavLink = {
  name: string;
  link: string;
};

export type CounterItem = {
  value: number;
  suffix: string;
  label: string;
};

export type LogoIcon = {
  imgPath: string;
  name: string;
};

export type Ability = {
  imgPath: string;
  title: string;
  desc: string;
};

export type TechStackImg = {
  name: string;
  imgPath: string;
};

export type TechStackIcon = {
  name: string;
  modelPath: string;
  scale: number;
  rotation: number[];
};

export type ExpCard = {
  review: string;
  imgPath: string;
  logoPath: string;
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
};

export type Testimonial = {
  name: string;
  mentions: string;
  review: string;
  imgPath: string;
};

export type SocialImg = {
  name: string;
  imgPath: string;
};
