"use client";

import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
  HiOutlineDevicePhoneMobile,
  HiChevronLeft,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import { VscCode } from "react-icons/vsc";

import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
  FaFigma,
  FaAmazon,
  FaDocker,
  FaNode,
  FaReact,
} from "react-icons/fa6";
import { DiJavascript, DiMongodb } from "react-icons/di";
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri";
import {
  SiApacheKafka,
  SiFastapi,
  SiMySQL,
  SiN8N,
  SiNestjs,
  SiPython,
  SiRedis,
  SiTypescript,
} from "react-icons/si";
import { BiLogoPostgresql, BiLogoSpringBoot } from "react-icons/bi";

export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  phone: HiOutlineDevicePhoneMobile,
  javascript: DiJavascript,
  nextjs: RiNextjsFill,
  supabase: RiSupabaseFill,
  figma: FaFigma,
  python: SiPython,
  mysql: SiMySQL,
  postgresql: BiLogoPostgresql,
  mongodb: DiMongodb,
  aws: FaAmazon,
  docker: FaDocker,
  node: FaNode,
  springboot: BiLogoSpringBoot,
  react: FaReact,
  typescript: SiTypescript,
  nestjs: SiNestjs,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
  chevronLeft: HiChevronLeft,
  redis: SiRedis,
  kafka: SiApacheKafka,
  vscode: VscCode,
  fastapi: SiFastapi,
  n8n: SiN8N,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
