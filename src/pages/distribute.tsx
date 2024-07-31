import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import Index from "@/modules/distribute/page/Index";
import { ProjectsProvider } from "@/modules/projects/context";

interface DistributeProps {
  projects: any;
}
const Distribute = ({ projects }: DistributeProps) => {
  return (
    <ProjectsProvider data={projects}>
      <Index />
    </ProjectsProvider>
  );
};

export default Distribute;

export const getServerSideProps = async (ctx) => {
  const postData = {
    0: {
      model: "Project",
      model_id: "None",
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
          { name: "content.websiteUrl" },
          { name: "content.fundingSources" },
          { name: "content.includedInBallots" },
          { name: "content.lists.count" },
          { name: "content.profile" },
          { name: "content.impactCategory" },
        ],
      },
      condition: {},
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
