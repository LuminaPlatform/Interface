import {
  HStack,
  Text,
  VStack,
  Table as ChakraTable,
  Thead,
  Tbody,
  Box,
  Tr,
  Td,
  Th,
  Icon,
  Button,
  Img,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { tableData } from "../constant";
import { PiLinkThin } from "react-icons/pi";
import Link from "next/link";
import { Project } from "../types";

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.9548 21.8396 9.94704 21.5422 9"
      stroke="rgba(48, 204, 136, 1)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8.5 9.5L12 13L21.0002 3"
      stroke="rgba(48, 204, 136, 1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.6665 3.33335C4.6665 2.96516 4.96498 2.66669 5.33317 2.66669L13.3332 2.66669C13.7014 2.66669 13.9998 2.96516 13.9998 3.33335C13.9998 3.70154 13.7014 4.00002 13.3332 4.00002L5.33317 4.00002C4.96498 4.00002 4.6665 3.70154 4.6665 3.33335Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 3.33335C2 2.96516 2.29714 2.66669 2.66369 2.66669H2.66965C3.03619 2.66669 3.33333 2.96516 3.33333 3.33335C3.33333 3.70154 3.03619 4.00002 2.66965 4.00002H2.66369C2.29714 4.00002 2 3.70154 2 3.33335Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 8.00004C2 7.63185 2.29714 7.33337 2.66369 7.33337H2.66965C3.03619 7.33337 3.33333 7.63185 3.33333 8.00004C3.33333 8.36823 3.03619 8.66671 2.66965 8.66671H2.66369C2.29714 8.66671 2 8.36823 2 8.00004Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12.6667C2 12.2985 2.29714 12 2.66369 12H2.66965C3.03619 12 3.33333 12.2985 3.33333 12.6667C3.33333 13.0349 3.03619 13.3333 2.66965 13.3333H2.66369C2.29714 13.3333 2 13.0349 2 12.6667Z"
      fill="white"
    />
    <path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.6665 8.00004C4.6665 7.63185 4.96498 7.33337 5.33317 7.33337L13.3332 7.33337C13.7014 7.33337 13.9998 7.63185 13.9998 8.00004C13.9998 8.36823 13.7014 8.66671 13.3332 8.66671L5.33317 8.66671C4.96498 8.66671 4.6665 8.36823 4.6665 8.00004Z"
      fill="white"
    />
    <path
      opacity="0.4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.6665 12.6667C4.6665 12.2985 4.96498 12 5.33317 12L13.3332 12C13.7014 12 13.9998 12.2985 13.9998 12.6667C13.9998 13.0349 13.7014 13.3333 13.3332 13.3333L5.33317 13.3333C4.96498 13.3333 4.6665 13.0349 4.6665 12.6667Z"
      fill="white"
    />
  </svg>
);

export const ArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.33334 13.3334L7.33318 3.33338C7.33318 2.96519 7.63165 2.6667 7.99984 2.6667C8.36803 2.66669 8.66651 2.96516 8.66651 3.33335L8.66668 13.3334C8.66668 13.7016 8.36821 14 8.00002 14C7.63183 14 7.33335 13.7016 7.33334 13.3334Z"
      fill="#B3B3B5"
    />
    <path
      d="M11.7947 6.48127C11.5289 6.73605 11.1069 6.72713 10.8521 6.46133L8 3.48602L5.14793 6.46133C4.89315 6.72713 4.47113 6.73605 4.20533 6.48127C3.93954 6.22648 3.93061 5.80446 4.1854 5.53867L7.06585 2.53374C7.16004 2.43535 7.27165 2.31878 7.38068 2.23199C7.51107 2.12821 7.71775 2 8 2C8.28224 2 8.48893 2.12821 8.61932 2.23199C8.72835 2.31878 8.83995 2.43535 8.93415 2.53374L11.8146 5.53867C12.0694 5.80446 12.0605 6.22648 11.7947 6.48127Z"
      fill="#B3B3B5"
    />
  </svg>
);

interface TableProps {
  search: string;
}
const Table = ({ search }: TableProps) => {
  const networkThreshold = 7;
  const [sorting, setSorting] = useState<SortingState>([]);
  const data = useMemo<Project[]>(
    () =>
      search
        ? tableData.filter((row) =>
            row.project.name.toLowerCase().includes(search.toLowerCase())
          )
        : tableData,
    [search]
  );
  const columnHelper = createColumnHelper<Project>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue() + 1,
      header: () => "#",
    }),
    columnHelper.accessor("project", {
      cell: (info) => (
        <HStack columnGap="8px" margin="0px !important">
          <Img
            rounded="full"
            width="36px"
            height="36px"
            src={info.getValue().src}
          />
          <VStack rowGap="6px" margin="0px !important">
            <HStack alignItems="center">
              <ChakraLink
                as={Link}
                href={`/projects/${info.row.original.id}`}
                textAlign="left"
              >
                {info.getValue().name}
              </ChakraLink>
              <Icon
                size={18}
                margin="0px !important"
                as={PiLinkThin}
                marginLeft="6px"
              />
            </HStack>
            <HStack
              width="full"
              justifyContent="flex-start"
              columnGap="4px"
              margin="0px !important"
              {...(info.getValue().cryptosImg.length <= 3 && {
                divider: (
                  <Divider
                    rounded="full"
                    margin="0px !important"
                    width="1px"
                    height="1px"
                    borderColor="gray.60"
                  />
                ),
              })}
            >
              {info
                .getValue()
                .cryptosImg.slice(0, networkThreshold)
                .map((img) =>
                  info.getValue().cryptosImg.length <= 3 ? (
                    <HStack
                      key={img.id}
                      columnGap="2px"
                      margin="0px !important"
                    >
                      {img.src}
                      <Text
                        margin="0px !important"
                        display="flex"
                        whiteSpace="nowrap"
                        color="gray.60"
                        fontSize="xs"
                        fontWeight="500"
                      >
                        {img.title}
                      </Text>
                    </HStack>
                  ) : (
                    img.src
                  )
                )}
              {info.getValue().cryptosImg.length > networkThreshold && (
                <Text margin="0px !important">
                  +{info.getValue().cryptosImg.length - networkThreshold}
                </Text>
              )}
            </HStack>
          </VStack>
        </HStack>
      ),
      header: () => <span>Project</span>,
    }),
    columnHelper.accessor("category", {
      header: () => "Category",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("allocated", {
      header: () => "Allocated",
      cell: (info) => <Text>{info.getValue() / 1000}K OP </Text>,
    }),
    columnHelper.accessor("inBallots", {
      header: "In Ballots",
      cell: (info) => (
        <HStack
          sx={{
            svg: {
              width: "16px",
              height: "16px",
            },
          }}
          margin="0px !important"
        >
          <Text>{info.getValue()}</Text>
          <Icon as={CheckMarkIcon} />
        </HStack>
      ),
    }),
    columnHelper.accessor("inLists", {
      header: "In List",
      cell: (info) => (
        <HStack margin="0px !important">
          <Text>{info.getValue()}</Text>
          <Icon as={ListIcon} />
        </HStack>
      ),
    }),
    columnHelper.accessor("tags", {
      sortingFn: (rowA, rowB, columnId) => {
        const columnAData: Project["tags"] = rowA.getValue(columnId);
        const columnBData: Project["tags"] = rowB.getValue(columnId);

        const rowAMinValue: Project["tags"][0]["value"] = columnAData.reduce(
          (min, obj) => {
            return obj.value < min ? obj.value : min;
          },
          columnAData[0].value
        );

        const rowBMinValue: Project["tags"][0]["value"] = columnBData.reduce(
          (min, obj) => {
            return obj.value < min ? obj.value : min;
          },
          columnBData[0].value
        );

        return rowAMinValue < rowBMinValue ? 1 : -1;
      },
      header: "RetroPGF Tags",
      cell: (info) => (
        <HStack columnGap="4px" margin="0px !important">
          {info.getValue().map((item) => (
            <Text
              whiteSpace="nowrap"
              borderRadius="12px"
              height="24px"
              lineHeight="24px"
              px="8px"
              fontSize="xs"
              fontWeight="bold"
              key={item.id}
              color={item.color.txt}
              bg={item.color.bg}
            >
              {item.title}
            </Text>
          ))}
        </HStack>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box pb="16px" fontFamily="satoshi" pt="16px" width="full">
      <ChakraTable
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
                  p="12px 22px !important"
                  fontSize="16px"
                  fontWeight="bold"
                  color="gray.60"
                  key={header.id}
                >
                  <HStack>
                    <Text>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Text>
                    {header.column.getIsSorted() === "asc" ? (
                      <Box>
                        <Icon as={ArrowDown} />
                      </Box>
                    ) : header.column.getIsSorted() === "desc" ? (
                      <Box transform="rotate(180deg)">
                        <Icon as={ArrowDown} />
                      </Box>
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
                  border: "none",
                },
              }}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <Td
                  borderColor="gray.600"
                  p="12px 22px"
                  color="gray.0"
                  fontSize="16px"
                  fontWeight="500"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Table;
