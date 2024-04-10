"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { tabs } from "../constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { StringParam, useQueryParams } from "use-query-params";
import TabBody from "./TabBody";

const TabBar = () => {
  const [query, setQuery] = useQueryParams({
    tab: StringParam,
  });
  const activeTab = useMemo(
    () =>
      tabs.findIndex((tab) => tab.query === query.tab) > 0
        ? tabs.findIndex((tab) => tab.query === query.tab)
        : 0,
    [query.tab]
  );

  return (
    <Tabs index={activeTab} width="full">
      <TabList borderColor="gray.400">
        {tabs.map((tab) => (
          <Tab
            _active={{ color: "gray.100" }}
            _hover={{ color: "primary.300", borderColor: "primary.300" }}
            _selected={{ color: "primary.300", borderColor: "primary.300" }}
            color="gray.40"
            fontSize="md"
            fontWeight="500"
            onClick={() => setQuery({ tab: tab.query })}
            key={tab.id}
          >
            {tab.title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((item) => (
          <TabPanel key={item.id}>
            <TabBody reviews={item.title} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default TabBar;