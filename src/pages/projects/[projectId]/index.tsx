import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { tableData } from "@/modules/projects/constant";
import {
  ProjectDetailProvider,
  ProjectReviewsProvider,
} from "@/modules/projects/pdp/context";
import { Index } from "@/modules/projects/pdp/page/Index";
import { Project, Review } from "@/modules/projects/types";
import { FetchObject } from "@/types";

const ProjectDetail = ({
  project,
  reviews,
}: {
  project: Project;
  reviews: Review[];
}) => {
  return (
    <ProjectDetailProvider project={project}>
      <ProjectReviewsProvider reviews={reviews}>
        <Index />
      </ProjectReviewsProvider>
    </ProjectDetailProvider>
  );
};

export default ProjectDetail;

export const getServerSideProps = async (ctx: any) => {
  const params = ctx.params;
  const projectId = params.projectId;

  const postData: { 0: FetchObject; 1: FetchObject } = {
    0: {
      model: "Project",
      model_id: "None",
      limit: 10,
      orders: [],
      fetch_graph: {
        flex_fields: [
          {
            name: "id",
          },
          {
            name: "name",
          },
          {
            name: "logo",
          },
          { name: "content.fundingSources" },
          { name: "content.includedInBallots" },
          { name: "content.applicantType" },
          { name: "content.websiteUrl" },
          { name: "content.bio" },
          { name: "content.profile" },
          { name: "content.applicant" },
          { name: "content.contributionDescription" },
          { name: "content.contributionLinks" },
          { name: "content.impactDescription" },
          { name: "content.impactMetrics" },
          { name: "content.impactCategory" },
        ],
      },
      condition: {
        __type__: "SimpleSearchCondition",
        field: "id",
        operator: "EQ",
        value: projectId,
      },
    },
    1: {
      model: "Project.reviews",
      model_id: projectId,
      limit: 4,
      orders: [],
      fetch_graph: {
        flex_fields: [
          {
            name: "*",
          },
          {
            name: "user",
            fetch_graph: {
              flex_fields: [
                {
                  name: "display_name",
                },
                {
                  name: "profile_picture",
                },
              ],
            },
          },
        ],
      },
      condition: {},
    },
  };
  const projectResponse = await axiosClient.post(apiKeys["fetch"], postData);
  const project = projectResponse.data["0"];
  const reviews = projectResponse.data["1"];

  if (project) {
    return {
      props: {
        project: project[0],
        reviews,
      },
    };
  }
  // return {
  //   notFound: true,
  // };
};
