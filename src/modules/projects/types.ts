export type Project = {
    id: number;
    allocated: number;
    category: string;
    inBallots: number;
    inLists: number;
    project: {
      href: string;
      name: string;
      cryptosImg: any[];
      src: string;
    };
    tags: {
      id: number;
      color: {
        bg: string;
        txt: string;
      };
      title: string;
      value: number;
    }[];
  };
  