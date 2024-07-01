import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { pageThreshold } from "@/constant";
import { ProjectsProvider } from "@/modules/projects/context";
import Index from "@/modules/projects/pages/Index";
import { FetchObject } from "@/types";

export default function Projects({ projects }) {
  return (
    <ProjectsProvider data={projects}>
      <Index />
    </ProjectsProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  const page = ctx.query.page || 1;
  const postData: { 0: FetchObject } = {
    0: {
      model: "Project",
      model_id: "None",
      limit: pageThreshold,
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
            name: "logo",
          },
          { name: "content.fundingSources" },
          { name: "content.includedInBallots" },
          { name: "content.lists.count" },
          { name: "content.profile" },
          { name: "content.impactCategory" },
        ],
      },
      condition: {
        __type__: "SimpleFetchCondition",
        field: "id",
        operator: "GTE",
        value: (page - 1) * pageThreshold,
      },
    },
  };
  const response = await axiosClient.post(apiKeys["fetch"], postData);
  const projects = await response.data["0"];
  return {
    props: {
      projects,
    },
  };
};
