import {
  VStack,
  Table as ChakraTable,
  HStack,
  Img,
  Link,
  Input,
  Thead,
  Tr,
  Th,
  Text,
  Tbody,
  Td,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  chakra,
  Box,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ProjectSearch } from "./ProjectSearch";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  TbArrowNarrowDown,
  TbArrowNarrowUp,
  TbBookmarkOff,
  TbBookmarkPlus,
  TbDotsVertical,
  TbExternalLink,
  TbInfoCircle,
} from "react-icons/tb";
import { useForm, useWatch } from "react-hook-form";
import { maximumAllocated } from "../constants";
import { CustomInput } from "./CustomInput";
import {
  useCustomToast,
  useDispatchSelectedProjects,
  useSelectedProjects,
} from "@/hooks/bases";
import { ACCESS_TOKEN_COOKIE_KEY, distributionRoundId } from "@/constant";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { getCookie } from "cookies-next";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
// TODO should fix any type

const columnHelper = createColumnHelper<any>();

const ChakraForm = chakra("form");
type AllocatedForm = {
  projects: Array<{ id?: Readonly<number>; value?: number; percent?: number }>;
  totalAllocated: number;
};
interface ProjectListProps {
  onOpen: () => void;
  search: string;
}
export const ProjectList = ({ onOpen, search }: ProjectListProps) => {
  const globalSelectedProjects = useSelectedProjects() as any;

  const router = useRouter();

  const dispatchGlobalSelectedProjects = useDispatchSelectedProjects();

  const { register, control, setValue, handleSubmit, getValues } =
    useForm<AllocatedForm>({
      defaultValues: {
        totalAllocated: 0,
        projects: globalSelectedProjects.map((item) => ({
          ...item,
          value: 0,
          percent: 0,
        })),
      },
    });

  const calculateTotalAllocated = () => {
    return (
      getValues("projects")?.reduce((accumulator, current) => {
        return accumulator + Number(current.value);
      }, 0) || 0
    );
  };

  const values = useWatch({ control });

  const data = useMemo<any>(() => {
    if (search) {
      return globalSelectedProjects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return globalSelectedProjects;
  }, [globalSelectedProjects, search]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const toast = useCustomToast();

  useEffect(() => {
    const projectsInFormId = getValues("projects").map((item) => item.id);
    const projectsId = globalSelectedProjects.map((item) => item.id);
    globalSelectedProjects.forEach((item) => {
      if (!projectsInFormId.includes(item.id)) {
        setValue("projects", [
          ...getValues("projects"),
          { ...item, value: item.value ?? 0, percent: item.percent ?? 0 },
        ]);
      } else {
        setValue(
          "projects",
          getValues("projects").filter((pr) => projectsId.includes(pr.id))
        );
      }
    });

    setValue("totalAllocated", calculateTotalAllocated());
  }, [globalSelectedProjects]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (info) => info.row.index + 1,
        header: () => "#",
      }),
      columnHelper.accessor("project", {
        header: () => "Project",
        cell: (info) => (
          <HStack columnGap="26px" width="full">
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
              <TbExternalLink
                color="var(--chakra-colors-gray-0)"
                fontSize="md"
              />
            </Link>
          </HStack>
        ),
      }),
      columnHelper.accessor("allocated", {
        header: () => (
          <Text color="gray.60" fontSize="md" fontWeight="700" maxW="186px">
            OP Allocated
          </Text>
        ),
        cell: (info) => {
          const findIndex = globalSelectedProjects.findIndex(
            (item) => item.id === info.row.original.id
          );
          return (
            <InputGroup height="42px">
              <InputRightElement>
                <Text fontSize="xs" fontWeight="500" color="gray.100">
                  OP
                </Text>
              </InputRightElement>
              <CustomInput
                {...register(`projects.${findIndex}.value`, {
                  onChange: (e) => {
                    setValue(`projects.${findIndex}.id`, info.row.original.id);
                    const sumOfValues = getValues("projects").reduce(
                      (accumulator, current) => {
                        return Number(current.value) + accumulator;
                      },
                      0
                    );
                    if (Number(sumOfValues) <= maximumAllocated) {
                      if (typeof getValues("totalAllocated") !== "undefined") {
                        const calculatePercent = () => {
                          return (+e.target.value * 100) / maximumAllocated;
                        };
                        setValue(
                          `projects.${findIndex}.value`,
                          +e.target.value
                        );
                        setValue(
                          `projects.${findIndex}.percent`,
                          calculatePercent()
                        );

                        setValue("totalAllocated", calculateTotalAllocated());
                      }
                    }
                  },
                })}
                padding="9px 12px"
                variant="outline"
                type="number"
                pr="40px"
              />
            </InputGroup>
          );
        },
        enableSorting: false,
      }),
      columnHelper.display({
        id: "percent",
        header: () => (
          <Text color="gray.60" fontSize="md" fontWeight="700" maxW="80px">
            %
          </Text>
        ),
        cell: (info) => {
          const findIndex = globalSelectedProjects.findIndex(
            (item) => item.id === info.row.original.id
          );
          return (
            <InputGroup maxWidth="80px" height="42px" padding="0">
              <InputRightElement
                top="50%"
                transform="translateY(-50%)"
                right="12px"
                width="12px"
                height="12px"
              >
                <Text fontSize="xs" fontWeight="500" color="gray.100">
                  %
                </Text>
              </InputRightElement>

              <Input
                {...register(`projects.${findIndex}.percent`, {
                  onChange: (e) => {
                    setValue(`projects.${findIndex}.id`, info.row.original.id);
                    const sumOfPercentages = getValues("projects").reduce(
                      (accumulator, current) => {
                        return Number(current.percent) + accumulator;
                      },
                      0
                    );
                    if (sumOfPercentages <= 100) {
                      if (typeof getValues("totalAllocated") !== "undefined") {
                        setValue(
                          `projects.${findIndex}.percent`,
                          e.target.value
                        );
                        const calculateValue = () => {
                          return (+e.target.value * maximumAllocated) / 100;
                        };
                        setValue(
                          `projects.${findIndex}.value`,
                          calculateValue()
                        );

                        setValue("totalAllocated", calculateTotalAllocated());
                      }
                    }
                  },
                })}
                padding="9px 12px"
                variant="outline"
                pr="25px"
              />
            </InputGroup>
          );
        },
        enableSorting: false,
      }),
      columnHelper.display({
        id: "actions",
        header: () => null,
        cell: (info) => {
          return (
            <Box position="relative">
              <Menu offset={[0, 0]}>
                <MenuButton
                  bg="transparent"
                  _hover={{
                    bg: "gray.600",
                    dropShadow: "1px 4px 16px 0px #00000040",
                  }}
                  _active={{}}
                  as={Button}
                >
                  <TbDotsVertical color="var(--chakra-colors-gray-0)" />{" "}
                </MenuButton>
                <MenuList
                  bg="transparent"
                  boxShadow="1px 4px 16px 0px #00000040"
                  overflow="hidden"
                  border="none"
                  p="0px"
                >
                  <MenuItem
                    onClick={() => {
                      router.push(`/projects/${info.row.original.id}`);
                    }}
                    bg="rgba(11, 11, 15)"
                    px="12px"
                    py="10px"
                  >
                    <HStack>
                      <TbInfoCircle
                        color="var(--chakra-colors-gray-40)"
                        fontSize="xl"
                      />
                      <Text fontSize="md" fontWeight="500" color="gray.40">
                        About Project
                      </Text>
                    </HStack>
                  </MenuItem>
                  <Divider opacity="0.8" borderColor="gray.500" />
                  <MenuItem
                    onClick={() => {
                      const tempProject = globalSelectedProjects.find(
                        (item) => item.id === info.row.original.id
                      );
                      const findIndex = globalSelectedProjects.findIndex(
                        (item) => item.id === info.row.original.id
                      );
                      const tempProjectValues = {
                        value: getValues("projects")?.[findIndex]?.value ?? 0,
                        percent:
                          getValues("projects")?.[findIndex]?.percent ?? 0,
                      };

                      dispatchGlobalSelectedProjects((prev) =>
                        prev.filter((item) => item.id !== info.row.original.id)
                      );

                      toast({
                        status: "error",
                        render: ({ onClose }) => (
                          <HStack borderRadius="4px" p="8px 16px" bg="red.400">
                            <Text color="white">
                              “Protocol Guild” removed from the list.
                            </Text>
                            <Button
                              onClick={() => {
                                dispatchGlobalSelectedProjects((prev) => [
                                  ...prev,
                                  {
                                    ...tempProject,
                                    value: tempProjectValues.value,
                                    percent: tempProjectValues.percent,
                                  },
                                ]);

                                onClose();
                              }}
                              _hover={{}}
                              _active={{}}
                              size="sm"
                              borderRadius="17px"
                              variant="outline"
                            >
                              Undo
                            </Button>
                          </HStack>
                        ),
                      });
                    }}
                    bg="rgba(11, 11, 15)"
                    px="12px"
                    py="10px"
                  >
                    <HStack>
                      <TbBookmarkOff
                        color="var(--chakra-colors-gray-40)"
                        fontSize="xl"
                      />
                      <Text fontSize="md" fontWeight="500" color="gray.40">
                        Remove
                      </Text>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          );
        },
        enableSorting: false,
      }),
    ],
    [
      dispatchGlobalSelectedProjects,
      getValues,
      globalSelectedProjects,
      register,
      setValue,
    ]
  );

  const table = useReactTable<any>({
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
    <VStack rowGap="16px" width="full">
      <HStack width="full" justifyContent="space-between">
        <Text color="gray.20" fontSize="lg" fontWeight="500">
          Distribute OP tokens to projects and help guide funding decisions for
          Optimism badge holders.
        </Text>
        {globalSelectedProjects.length !== 0 && (
          <Button
            onClick={onOpen}
            variant="outline"
            size="md"
            leftIcon={<TbBookmarkPlus fontSize="20px" />}
          >
            Add Projects
          </Button>
        )}
      </HStack>
      <ChakraForm width="full">
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
                    width={
                      header.index === 0
                        ? "39px"
                        : header.index === 1
                        ? "calc(100% - 361px)"
                        : header.index === 2
                        ? "186px"
                        : header.index === 3
                        ? "80px"
                        : "56px"
                    }
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
                    <HStack justifyContent="flex-start" width="full">
                      <Text>
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
                    border: "none",
                  },
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
      </ChakraForm>
      <Stack
        width="full"
        justifyContent={{ md: "space-between" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <HStack>
          <Text color="gray.20" fontSize="lg" fontWeight="500">
            {getValues("totalAllocated")} OP Allocated
          </Text>
          <Text color="gray.100" fontSize="lg" fontWeight="400">
            {`(${
              maximumAllocated - Number(getValues("totalAllocated"))
            } OP Left)`}
          </Text>
        </HStack>
        <Button
          isDisabled={!getValues("totalAllocated")}
          onClick={handleSubmit((formData) => {
            const [, id] = distributionRoundId[0];

            const hasAmountProjects = formData.projects.filter(
              (project) => +project.value !== 0
            );
            // updates is the api body name :(
            const updates = hasAmountProjects.map((item) => ({
              project_id: item.id,
              amount: +item.value,
            }));

            axiosClient
              .post(
                apiKeys.distribute,
                {
                  distribution_round_id: id,
                  updates,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie(
                      ACCESS_TOKEN_COOKIE_KEY
                    )}`,
                  },
                }
              )
              .then((response) => {
                toast({
                  status: "success",
                  description: response.data?.message,
                });
              })
              .catch((error: AxiosError<{ error_message: string }>) => {
                toast({
                  status: "error",
                  description: error.response.data.error_message,
                });
              });
          })}
          type="button"
          variant="primary"
        >
          Confirm Distribution
        </Button>
      </Stack>
    </VStack>
  );
};
