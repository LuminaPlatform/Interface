import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import Index from "@/modules/distribute/page/Index";
import { ProjectsProvider } from "@/modules/projects/context";
import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const postData = {
    0: {
      model: "Project",
      model_id: "None",
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
