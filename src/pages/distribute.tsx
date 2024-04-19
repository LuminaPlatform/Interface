import { ProjectsProvider } from "@/modules/distribute/context";
import Index from "@/modules/distribute/page/Index";

const distribute = () => {
  return (
    <ProjectsProvider>
      <Index />
    </ProjectsProvider>
  );
};

export default distribute;
