import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import { ProjectsProvider } from "@/modules/projects/context";
import Index from "@/modules/projects/pages/Index";
import { FetchObject } from "@/types";

export default function Projects({ projects }) {
  console.log({ projects });

  return (
    <ProjectsProvider data={projects}>
      <Index />
    </ProjectsProvider>
  );
}

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query);

  const postData: FetchObject = {
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
        { name: "content" },
      ],
    },
    condition: {},
  };
  const response = await axiosClient.post<FetchObject>(
    apiKeys["read"]["fetch"],
    postData
  );
  const projects = await response.data;
  return {
    props: {
      projects,
    },
  };
};
