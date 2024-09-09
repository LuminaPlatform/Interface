import {
  Box,
  Divider,
  Fade,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  useOutsideClick,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  TbChevronRight,
  TbFiles,
  TbMessage,
  TbSearch,
  TbUsers,
  TbX,
} from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import PeopleCard from "./globalSearch/PeopleCard";
import ProjectCard from "./globalSearch/ProjectCard";
import ReviewCard from "./globalSearch/ReviewCard";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";

const SearchField = () => {
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchBarRef = React.useRef();

  useOutsideClick({
    ref: searchBarRef,
    handler: () => {
      setSearch("");
    },
  });

  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);

      axiosClient
        .post(apiKeys.fetch, {
          "0": {
            model: "Project",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "id",
                },
                {
                  name: "name",
                },
                {
                  name: "logo_id",
                },
                {
                  name: "content.fundingSources",
                },
                {
                  name: "content.includedInBallots",
                },
                {
                  name: "content.lists.count",
                },
                {
                  name: "content.profile",
                },
                {
                  name: "content.impactCategory",
                },
              ],
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "name",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedProjects(res.data[0]);
        });

      axiosClient
        .post(apiKeys.fetch, {
          "0": {
            model: "Review",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
                {
                  name: "user",
                  graph: {
                    fetch_fields: [
                      {
                        name: "display_name",
                      },
                      {
                        name: "id",
                      },
                      {
                        name: "profile_id",
                      },
                    ],
                  },
                },
              ],
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "title",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedReviews(res.data[0]);
          console.log(res.data[0]);
        });

      axiosClient
        .post(apiKeys.fetch, {
          "0": {
            model: "User",
            model_id: "None",
            orders: [],
            graph: {
              fetch_fields: [
                {
                  name: "*",
                },
              ],
            },
            condition: {
              __type__: "SimpleFetchCondition",
              field: "username",
              operator: "LIKE",
              value: search,
            },
          },
        })
        .then((res) => {
          setSearchedUsers(res.data[0]);
        })
        .finally(() => setIsLoading(false));

      // setIsLoading(false);
    }
  }, [search]);

  return (
    <VStack position="relative">
      <InputGroup
        display={{ base: "none", md: "inline-block" }}
        width="395px"
        height="40ox"
      >
        <InputLeftElement>
          <TbSearch
            size={24}
            color={
              search == ""
                ? "var(--chakra-colors-gray-100)"
                : "var(--chakra-colors-gray-40)"
            }
          />
        </InputLeftElement>
        <Input
          px="16px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="gray.700"
          border={search == "" ? "1px solid" : 0}
          borderColor="gray.200"
          _hover={{
            borderColor: "gray.300",
          }}
          _active={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "gray.400" }}
          boxShadow="none !important"
          outline="none"
          fontFamily="satoshi"
          fontSize="md"
          color="gray.20"
          fontWeight="regular"
          _placeholder={{
            fontWeight: "regular",
            color: "gray.100",
          }}
          borderRadius="27px"
          borderBottomRadius={search == "" ? "27px" : "0"}
          placeholder="Search"
        />
        {search != "" && (
          <InputRightElement
            onClick={() => {
              setSearch("");
            }}
            cursor="pointer"
          >
            <TbX size={20} color="var(--chakra-colors-gray-80)" />
          </InputRightElement>
        )}
      </InputGroup>

      <Fade ref={searchBarRef} in={search != ""}>
        <VStack
          width="395px"
          maxH="580px"
          bg="gray.700"
          zIndex="dropdown"
          position="absolute"
          top="40px"
          left="0"
          borderBottomRadius="27px"
          p="16px"
          pt="0"
          pr="8px"
          boxShadow="dark-lg"
        >
          <VStack
            borderTop="1px solid"
            borderTopColor="gray.400"
            pt="4px"
            w="full"
            overflowY="auto"
          >
            <VStack
              minH="54px"
              pt="16px"
              w="full"
              gap="8px"
              overflowX="hidden"
              pr="8px"
              divider={<Divider />}
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(67, 67, 70, 1)",
                },
              }}
            >
              {!isLoading &&
                !searchedUsers.length &&
                !searchedProjects.length &&
                !searchedReviews.length && (
                  <Text textColor="gray.60">Non found</Text>
                )}
              {isLoading && <Spinner color="primary.300" />}
              {!!searchedUsers.length && !isLoading && (
                <VStack w="full" gap="12px" alignItems={"start"}>
                  <HStack w="full" justifyContent="space-between">
                    <HStack gap="6px">
                      <TbUsers color="var(--chakra-colors-gray-80)" />
                      <Text color="gray.80" fontSize="12px" fontWeight="700">
                        People
                      </Text>
                    </HStack>
                    <Link
                      onClick={() => {
                        setSearch("");
                      }}
                      href="/search"
                    >
                      <HStack gap="4px" mr="-4px">
                        <Text color="gray.60" fontSize="12px">
                          Show All
                        </Text>
                        <TbChevronRight color="var(--chakra-colors-gray-60)" />
                      </HStack>
                    </Link>
                  </HStack>

                  <Box
                    w="full"
                    overflow="hidden"
                    whiteSpace={"nowrap"}
                    pb={"4px"}
                  >
                    <Swiper
                      direction="horizontal"
                      spaceBetween={8}
                      slidesPerView="auto"
                      freeMode={true}
                      style={{ overflow: "visible" }}
                    >
                      {searchedUsers.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          style={{
                            width: "auto",
                            display: "inline-flex",
                          }}
                        >
                          <PeopleCard
                            id={item?.id.toString()}
                            setSearch={setSearch}
                            search={search}
                            name={
                              item?.username ||
                              item?.x_username ||
                              item?.display_name
                            }
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                </VStack>
              )}

              {!!searchedProjects.length && !isLoading && (
                <VStack w="full" gap="12px" alignItems={"start"}>
                  <HStack w="full" justifyContent="space-between">
                    <HStack gap="6px">
                      <TbFiles color="var(--chakra-colors-gray-80)" />
                      <Text color="gray.80" fontSize="12px" fontWeight="700">
                        Projects
                      </Text>
                    </HStack>
                    <Link
                      onClick={() => {
                        setSearch("");
                      }}
                      href="/search"
                    >
                      <HStack gap="4px" mr="-4px">
                        <Text color="gray.60" fontSize="12px" fontWeight="700">
                          Show All
                        </Text>
                        <TbChevronRight color="var(--chakra-colors-gray-60)" />
                      </HStack>
                    </Link>
                  </HStack>

                  <Box
                    w="full"
                    overflow="hidden"
                    whiteSpace={"nowrap"}
                    pb={"4px"}
                  >
                    <Swiper
                      direction="horizontal"
                      spaceBetween={8}
                      slidesPerView="auto"
                      freeMode={true}
                      style={{ overflow: "visible" }}
                    >
                      {searchedProjects.map((item, index) => (
                        <SwiperSlide
                          key={index}
                          style={{
                            width: "auto",
                            display: "inline-flex",
                          }}
                        >
                          <ProjectCard
                            id={item?.id.toString()}
                            setSearch={setSearch}
                            name={item.name}
                            search={search}
                            imageUrl={item.content.profile?.profileImageUrl}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                </VStack>
              )}

              {!!searchedReviews.length && !isLoading && (
                <VStack w="full" gap="12px" alignItems={"start"}>
                  <HStack w="full" justifyContent="space-between">
                    <HStack gap="6px">
                      <TbMessage color="var(--chakra-colors-gray-80)" />
                      <Text color="gray.80" fontSize="12px" fontWeight="700">
                        Reviews
                      </Text>
                    </HStack>
                    <Link
                      onClick={() => {
                        setSearch("");
                      }}
                      href="/search"
                    >
                      <HStack gap="4px" mr="-4px">
                        <Text color="gray.60" fontSize="12px" fontWeight="700">
                          Show All
                        </Text>
                        <TbChevronRight color="var(--chakra-colors-gray-60)" />
                      </HStack>
                    </Link>
                  </HStack>
                  <VStack w="full" gap="12px">
                    {searchedReviews.map((item, index) => (
                      <ReviewCard
                        key={index}
                        title={item.title}
                        text={item.description}
                        name={item.user?.display_name || "user"}
                        UserProfileID={item.user?.id.toString()}
                        date={item.createTimestamp}
                        search={search}
                        project={item.project_id}
                        review={item.id}
                        viewpoint={item.viewpoint}
                      />
                    ))}
                  </VStack>
                </VStack>
              )}
            </VStack>
          </VStack>
        </VStack>
      </Fade>
    </VStack>
  );
};

export default SearchField;
