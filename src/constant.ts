import {
  TbMoodConfuzedFilled,
  TbMoodHappyFilled,
  TbMoodSadFilled,
  TbMoodSmileFilled,
} from "react-icons/tb";

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
    name: "Advocate",
    colorScheme: "green",
    icon: TbMoodHappyFilled,
  },
  {
    id: 1,
    name: "Neutral",
    colorScheme: "blue",
    icon: TbMoodSmileFilled,
  },
  {
    id: 2,
    name: "Intrigued",
    colorScheme: "yellow",
    icon: TbMoodConfuzedFilled,
  },
  {
    id: 3,
    name: "Discourage",
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
