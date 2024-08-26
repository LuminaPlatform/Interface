import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import {
  ProjectDetailProvider,
  ProjectReviewsProvider
} from "@/modules/projects/pdp/context";
import { Reviews as PageBase } from "@/modules/projects/pdp/page/Reviews";
import { Project, Review } from "@/modules/projects/types";
import { GetServerSideProps } from "next";

interface ReviewsProps {
  project: Project;
  reviews: Review[];
  viewpoints: any;
  userViewpoint: any;
}
const Reviews = ({
  reviews,
  project,
  viewpoints,
  userViewpoint
}: ReviewsProps) => {
  return (
    <ProjectDetailProvider project={{ ...project, viewpoints, userViewpoint }}>
      <ProjectReviewsProvider reviews={reviews}>
        <PageBase />
      </ProjectReviewsProvider>
    </ProjectDetailProvider>
  );
};

export default Reviews;

export const getServerSideProps: GetServerSideProps<ReviewsProps> = async (
  ctx
) => {
  const { params } = ctx;
  const { projectId } = params;

  const accessToken = ctx?.req?.cookies?.[ACCESS_TOKEN_COOKIE_KEY] ?? undefined;
  const userInfo = await axiosClient.get(apiKeys.auth.isAuthorized, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const userViewpoint = await axiosClient
    .post(
      apiKeys.fetch,
      {
        "0": {
          model: "ViewPoint",
          model_id: "None",
          limit: 1,
          orders: [],
          graph: {
            fetch_fields: [
              {
                name: "*"
              }
            ]
          },
          condition: {
            __type__: "ComplexSearchCondition",
            operator: "AND",
            conditions: [
              {
                __type__: "SimpleFetchCondition",
                field: "user_id",
                operator: "EQ",
                value: userInfo.data.id
              },
              {
                __type__: "SimpleFetchCondition",
                field: "project_id",
                operator: "EQ",
                value: projectId
              }
            ]
          }
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .then((res) => res.data[0])
    .catch(() => {
      return [];
    });

  const viewpoints = await axiosClient
    .get(`${apiKeys.viewpoint}/${projectId}`)
    .then((response) => response.data.viewpoints);

  return axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "Project",
        model_id: "None",
        limit: 1,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "id"
            },
            {
              name: "name"
            },
            {
              name: "logo_id"
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
            { name: "content.impactCategory" }
          ]
        },
        condition: {
          __type__: "SimpleFetchCondition",
          field: "id",
          operator: "EQ",
          value: projectId
        }
      },
      1: {
        model: "Project.reviews",
        model_id: projectId,
        orders: [],
        graph: {
          fetch_fields: [
            {
              name: "*"
            },
            {
              name: "user",
              graph: {
                fetch_fields: [
                  {
                    name: "display_name"
                  },
                  {
                    name: "id"
                  },
                  {
                    name: "profile_id"
                  }
                ]
              }
            },
            {
              name: "files",
              graph: {
                fetch_fields: [
                  {
                    name: "*"
                  }
                ]
              }
            }
          ]
        },
        condition: {}
      }
    })
    .then(async (response) => {
      const project = response.data["0"];
      const reviews = response.data["1"];

      const userRole = await axiosClient.post(apiKeys.fetch, {
        "0": {
          model: "User.roles",
          model_id: userInfo.data.id,
          orders: [],
          graph: { fetch_fields: [{ name: "*" }] },
          condition: {}
        }
      });

      return {
        props: {
          project: project[0],
          reviews,
          viewpoints,
          userViewpoint: userViewpoint ?? [],
          userRole: userRole.data[0]
        }
      };
    })
    .catch(() => {
      return {
        notFound: true
      };
    });
};
