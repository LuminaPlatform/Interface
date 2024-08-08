import { apiKeys } from "@/api/apiKeys";
import { axiosClient } from "@/config/axios";
import Index from "@/modules/globalSearch/pages/Index";

import { ProjectsProvider } from "@/modules/projects/context";
import { GetServerSideProps } from "next";

interface GlobalSearchProps {
  projects: any;
}
const GlobalSearch = ({ projects }: GlobalSearchProps) => {
  return (
    <>
      <Index />
    </>
    // <ProjectsProvider data={projects}>
    // </ProjectsProvider>
  );
};

export default GlobalSearch;
