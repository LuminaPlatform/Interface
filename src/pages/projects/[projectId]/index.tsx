import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
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
  viewpoints,
  userViewpoint,
}: {
  project: Project;
  reviews: Review[];
  viewpoints: any;
  userViewpoint: any;
}) => {

  return (
    <ProjectDetailProvider project={{ ...project, viewpoints, userViewpoint }}>
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
  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;

  const userViewpoint = await axiosClient
    .get(apiKeys["auth"]["isAuthorized"], {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      return axiosClient.post(
        apiKeys["fetch"],
        {
          "0": {
            model: "ViewPoint",
            model_id: "None",
            limit: 1,
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
              ],
            },
            condition: {
              __type__: "ComplexSearchCondition",
              operator: "AND",
              conditions: [
                {
                  __type__: "SimpleFetchCondition",
                  field: "user_id",
                  operator: "EQ",
                  value: response.data.id,
                },
                {
                  __type__: "SimpleFetchCondition",
                  field: "project_id",
                  operator: "EQ",
                  value: projectId,
                },
              ],
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    })
    .then((res) => res.data[0])
    .catch(() => {
      return [];
    });

  const viewpoints = await axiosClient
    .get(`${apiKeys.viewpoint}/${projectId}`)
    .then((response) => response.data.viewpoints);


  const postData: { 0: FetchObject; 1: FetchObject } = {
    0: {
      model: "Project",
      model_id: "None",
      limit: 10,
      orders: [],
      graph: {
        fetch_fields: [
          {
            name: "id",
          },
          {
            name: "name",
          },
          {
            name: "logo_id",
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
        __type__: "SimpleFetchCondition",
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
      graph: {
        fetch_fields: [
          {
            name: "*",
          },
          {
            name: "user",
            graph: {
              fetch_fields: [
                {
                  name: "display_name",
                },
                {
                  name: "id",
                },
              ],
            },
          },
        ],
      },
      condition: {},
    },
  };
  const projectResponse = await axiosClient.post(apiKeys["fetch"], postData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const project = projectResponse.data["0"];
  const reviews = projectResponse.data["1"];


  if (project) {
    return {
      props: {
        project: project[0],
        reviews,
        viewpoints,
        userViewpoint: userViewpoint ?? [],
      },
    };
  }
  // return {
  //   notFound: true,
  // };
};
