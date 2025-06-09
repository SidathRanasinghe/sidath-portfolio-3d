import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueId = (): string => {
  return `${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
};
