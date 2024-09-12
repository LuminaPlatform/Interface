import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  Checkbox,
  HStack,
  Table as ChakraTable,
  Td,
  Tr,
  Tbody,
  Box,
  Text,
  Th,
  Thead,
  Img,
  Link,
  FormLabel,
  Flex
} from "@chakra-ui/react";
import {
  TbArrowNarrowDown,
  TbArrowNarrowUp,
  TbExternalLink
} from "react-icons/tb";
import { useProjects } from "@/modules/projects/hooks";
// TODO should fix any type

interface AddProjectTableProps {
  selectedProjects: any;
  setSelectedProjects: Dispatch<SetStateAction<any>>;
  search: string;
}

export const AddProjectTable = ({
  selectedProjects,
  setSelectedProjects,
  search
}: AddProjectTableProps) => {
  const tableData = useProjects();

  const data = useMemo<any>(() => {
    if (search) {
      return tableData.filter((project: any) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return tableData;
  }, [search]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: () => "#"
    }),
    columnHelper.accessor("project", {
      header: () => "Project",
      cell: (info) => (
        <HStack width="full">
          <Img
            width="36px"
            height="36px"
            rounded="full"
            src={
              info.row.original.content.profile.profileImageUrl ||
              "/assets/images/default-img.png"
            }
          />
          <Link
            color="gray.0"
            fontSize="md"
            fontWeight="500"
            columnGap="6px"
            display="flex"
            alignItems="center"
            whiteSpace="nowrap"
            href={info.row.original.content.websiteUrl}
          >
            {info.row.original.name}{" "}
            <TbExternalLink color="var(--chakra-colors-gray-0)" fontSize="md" />
          </Link>
        </HStack>
      )
    }),
    columnHelper.display({
      id: "isSelected",
      header: () => {
        return (
          <HStack justifyContent="flex-end" width="full !important">
            <FormLabel margin="0px" htmlFor="select_all">
              Select All
            </FormLabel>
            <Checkbox
              size="md"
              variant="primary"
              id="select_all"
              isChecked={
                selectedProjects.length === data.length && data.length !== 0
              }
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectedProjects(data);
                } else {
                  setSelectedProjects([]);
                }
              }}
            />
          </HStack>
        );
      },
      cell: (info) => {
        return (
          <Box dir="rtl" justifyContent="flex-start">
            <Checkbox
              size="md"
              variant="primary"
              isChecked={
                !!selectedProjects.find(
                  (rows: any) => rows.id === info.row.original.id
                )
              }
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectedProjects((prev: any) => [
                    ...prev,
                    info.row.original
                  ]);
                } else {
                  setSelectedProjects((prev: any) =>
                    prev.filter((item: any) => item.id !== info.row.original.id)
                  );
                }
              }}
              value={info.row.original.id}
            />
          </Box>
        );
      },
      enableSorting: false
    })
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Flex width="full" height="480px" overflowY="auto">
      <ChakraTable
        height="480px"
        overflowY="auto"
        bg="gray.800"
        borderRadius="16px"
        zIndex={10}
        position="relative"
      >
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  fontFamily="satoshi"
                  borderColor="gray.600"
                  onClick={header.column.getToggleSortingHandler()}
                  whiteSpace="nowrap"
                  p="12px 24px !important"
                  fontSize="16px"
                  fontWeight="bold"
                  color="gray.60"
                  key={header.id}
                >
                  <HStack width="full">
                    <Text width="full">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>
                    {header.column.getIsSorted() === "asc" ? (
                      <TbArrowNarrowDown />
                    ) : header.column.getIsSorted() === "desc" ? (
                      <TbArrowNarrowUp />
                    ) : null}
                  </HStack>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr
              _last={{
                td: {
                  border: "none"
                }
              }}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  borderColor="gray.600"
                  p="6px 12px"
                  color="gray.0"
                  fontSize="16px"
                  fontWeight="500"
                  key={cell.id}
                  pl="0"
                  _first={{ pl: "24px", pr: "8px", width: "24px" }}
                  _last={{ pr: "24px" }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Flex>
  );
};
