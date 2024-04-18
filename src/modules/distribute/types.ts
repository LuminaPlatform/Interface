export type Project = {
    id: number;
    project: {
      href: string;
      name: string;
      src: string;
    };
    isSelected: boolean;
    opAllocated: number;
  };