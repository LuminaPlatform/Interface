import {
  TbMoodConfuzedFilled,
  TbMoodHappyFilled,
  TbMoodSadFilled,
  TbMoodSmileFilled,
} from "react-icons/tb";

export const tabs = [
  {
    id: 0,
    title: "For You",
    query: "for_you",
  },
  {
    id: 1,
    title: "Newest",
    query: "newest",
  },
  {
    id: 2,
    title: "Popular",
    query: "popular",
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
