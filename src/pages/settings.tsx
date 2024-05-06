import { useAuthorization } from "@/hooks/bases";
import { Index } from "@/modules/settings/page/Index";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const Settings = () => {
  return <Index />;
};

export default Settings;
