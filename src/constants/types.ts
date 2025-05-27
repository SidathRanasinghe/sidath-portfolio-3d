type Configs = {
  show?: boolean;
  enabled?: boolean;
};

export type HeroTitleWord = {
  text: string;
  imgPath: string;
  configs: Configs;
};

export type NavLink = {
  name: string;
  link: string;
  configs: Configs;
};

export type CounterItem = {
  value: number;
  suffix: string;
  label: string;
  configs: Configs;
};

export type LogoIcon = {
  imgPath: string;
  name: string;
  configs: Configs;
};

export type Ability = {
  imgPath: string;
  title: string;
  desc: string;
  configs: Configs;
};

export type TechStackImg = {
  name: string;
  imgPath: string;
  configs: Configs;
};

export type TechStackIcon = {
  name: string;
  modelPath: string;
  scale: number;
  rotation: number[];
  configs: Configs;
};

export type ExpCard = {
  review: string;
  imgPath: string;
  logoPath: string;
  title: string;
  date: string;
  responsibilities: string[];
  configs: Configs;
};

export type ExpLogo = {
  name: string;
  imgPath: string;
  configs: Configs;
};

export type Testimonial = {
  name: string;
  mentions: string;
  review: string;
  imgPath: string;
  configs: Configs;
};

export type SocialImg = {
  name: string;
  imgPath: string;
  configs: Configs;
};
