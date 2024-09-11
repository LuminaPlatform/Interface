import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgressPackage from "nprogress";

export const NProgress = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  NProgressPackage.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgressPackage.start();
    });
    NProgressPackage.done();
    return () => {
      router.events.off("routeChangeStart", () => {
        NProgressPackage.start();
      });
    };
  }, [pathname, searchParams]);
  return <></>;
};
