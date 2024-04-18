import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TbSearch } from "react-icons/tb";

interface ProjectSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export const ProjectSearch = ({ search, setSearch }: ProjectSearchProps) => {
  return (
    <InputGroup width="full" position="relative">
      <InputLeftElement left="16px" width="fit-content" height="full">
        <TbSearch color="var(--chakra-colors-gray-100)" />
      </InputLeftElement>
      <Input
        height="30px"
        borderRadius="27px"
        variant="outline"
        placeholder="search"
        onChange={(e) => {
          const value = e.target.value.replace(/^\s+|\s+$/g, "");
          setSearch(value);
        }}
        value={search}
      />
    </InputGroup>
  );
};
