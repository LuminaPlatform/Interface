import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import {
  ProjectDetailProvider,
  ProjectReviewsProvider,
} from "@/modules/projects/pdp/context";
import { Reviews as PageBase } from "@/modules/projects/pdp/page/Reviews";
import { Project, Review } from "@/modules/projects/types";
import { GetServerSideProps } from "next";

interface ReviewsProps {
  project: Project;
  reviews: Review[];
}
const Reviews = ({ reviews, project }: ReviewsProps) => {
  return (
    <ProjectDetailProvider project={project}>
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
  const params = ctx.params;
  const projectId = params.projectId;

  return axiosClient
    .post(apiKeys.fetch, {
      0: {
        model: "Project",
        model_id: "None",
        limit: 1,
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
    })
    .then((response) => {
      const project = response.data["0"];
      const reviews = response.data["1"];
      return {
        props: {
          project: project[0],
          reviews,
        },
      };
    })
    .catch((error) => {
      return {
        notFound: true,
      };
    });
};
