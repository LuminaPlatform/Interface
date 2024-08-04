export type Project = {
  id: number;
  logo: string;
  name: string;
  content: {
    contributionLinks: {
      data: {
        description: string;
        type: "CONTRACT_ADDRESS" | "OTHER" | "GITHUB_REPO";
        url: string;
      }[];
    };
    contributionDescription: string;
    impactDescription: string;
    impactMetrics: {
      data: {
        description: string;
        number: string;
        url: string;
      }[];
    };
    impactCategory: { data: string[] };
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
  createTimestamp: string;
  user: {
    display_name: string | null;
    id: string | null;
    profile_id: string | null;
  };
  project?: Project;
  files: any;
};
