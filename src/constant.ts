import {
  TbMoodConfuzedFilled,
  TbMoodHappyFilled,
  TbMoodSadFilled,
  TbMoodSmileFilled,
} from "react-icons/tb";
import { VIEW_POINT } from "./modules/projects/types";

export const sidebarWidth = {
  open: "167px",
  close: "83px",
};

export const dataConnectors = [
  {
    id: 0,
    type: "metaMask",
    icon: "/assets/icons/metamask.svg",
  },
  {
    id: 1,
    type: "walletConnect",
    icon: "/assets/icons/walletconnect.svg",
  },
];

export const reviewStatuses = [
  {
    id: 0,
    name: VIEW_POINT.ADVOCATE,
    colorScheme: "green",
    icon: TbMoodHappyFilled,
  },
  {
    id: 1,
    name: VIEW_POINT.USER,
    colorScheme: "blue",
    icon: TbMoodSmileFilled,
  },
  {
    id: 2,
    name: VIEW_POINT.ABSTAINER,
    colorScheme: "yellow",
    icon: TbMoodConfuzedFilled,
  },
  {
    id: 3,
    name: VIEW_POINT.OPPOSER,
    colorScheme: "red",
    icon: TbMoodSadFilled,
  },
];

export const interestsFakeData = [
  {
    id: 0,
    title: "DeFi",
  },
  {
    id: 1,
    title: "Metaverse",
  },
  {
    id: 2,
    title: "NFT",
  },
  {
    id: 3,
    title: "Game",
  },
  {
    id: 4,
    title: "Tools",
  },
  {
    id: 5,
    title: "Social",
  },
];

export const ACCESS_TOKEN_COOKIE_KEY = "access_token";
export const currencyScale = {
  OP: 1.35,
  USD: 1,
};

export const primaryCategories = [
  {
    value: 0,
    title: "COLLECTIVE GOVERNANCE",
    shortTitle: "COLL GOV",
    color: { bg: "rgba(150, 191, 252, 1)", txt: "rgba(0, 60, 151, 1)" },
  },
  {
    value: 1,
    title: "DEVELOPER ECOSYSTEM",
    shortTitle: "DEV ECO",
    color: { bg: "rgba(153, 230, 196, 1)", txt: "rgba(4, 118, 68, 1)" },
  },
  {
    value: 2,
    title: "END USER EXPERIENCE AND ADOPTION",
    shortTitle: "END UX",
    color: { bg: "rgba(255, 234, 150, 1)", txt: "rgba(156, 124, 0, 1)" },
  },
  {
    value: 3,
    title: "OP STACK",
    shortTitle: "OP STACK",
    color: { bg: "rgba(255, 175, 175, 1)", txt: "rgba(156, 36, 36, 1)" },
  },
];

export const pageThreshold = 5;
