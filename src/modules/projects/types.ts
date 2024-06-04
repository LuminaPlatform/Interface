export type Project = {
  id: number;
  logo: string;
  name: string;
  content: {
    contributionLinks: {
      description: string;
      type: string;
      url: string;
    }[];
    contributionDescription: string;
    impactDescription: string;
    impactMetrics: {
      description: string;
      number: string;
      url: string;
    }[];
    impactCategory: string[];
    applicant: {
      address: {
        address: string;
      };
    };
    applicantType: string;
    bio: string;
    fundingSources: {
      amount: number;
      currency: string;
      description: string;
      type: string;
    }[];
    includedInBallots: number;
    profile: {
      bannerImageUrl: string;
      id: string;
      profileImageUrl: string;
    };
    websiteUrl: string;
  };
};

export enum VIEW_POINT {
  "ADVOCATE" = "ADVOCATE",
  "ABSTAINER" = "ABSTAINER",
  "OPPOSER" = "OPPOSER",
  "USER" = "USER",
}

export type Review = {
  id: number;
  title: string;
  description: string;
  user_id: number;
  project_id: number;
  viewpoint: VIEW_POINT;
  user: {
    display_name: string | null;
    profile_picture: string | null;
  };
  project?: Project;
};
