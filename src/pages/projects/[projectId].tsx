import { tableData } from "@/modules/projects/constant";
import { ProjectDetailProvider } from "@/modules/projects/pdp/context";
import { Index } from "@/modules/projects/pdp/page/Index";
import { ProjectDetailProps } from "@/modules/projects/pdp/types";

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <ProjectDetailProvider project={project}>
      <Index />
    </ProjectDetailProvider>
  );
};

export default ProjectDetail;

export const getServerSideProps = async (ctx: any) => {
  const params = ctx.params;
  const data = tableData.find((item) => item.id === +params.projectId);
  if (data) {
    return {
      props: {
        project: data,
      },
    };
  }

  return {
    notFound: true,
  };
};
