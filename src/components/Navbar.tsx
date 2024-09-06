"use client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Fade,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  // Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectModal } from "./modals/Connect";
import {
  useAuthorization,
  useGlobalUserData,
  useWalletModal,
} from "@/hooks/bases";
import {
  TbBell,
  TbChevronRight,
  TbFiles,
  TbLogout,
  TbMessage,
  TbSearch,
  TbSettings2,
  TbUserCircle,
  TbUsers,
  TbX,
} from "react-icons/tb";
import Link from "next/link";
import { BadgeModal } from "./modals/badges/Badge";
import { Badges } from "@/types";
import { Logout } from "./modals/Logout";
import { NotificationItem } from "./NotificationItem";
import { AnimatePresence, motion } from "framer-motion";
import PeopleCard from "./globalSearch/PeopleCard";
import ProjectCard from "./globalSearch/ProjectCard";
import ReviewCard from "./globalSearch/ReviewCard";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";

import { Swiper, SwiperSlide } from "swiper/react";

const ProfileBox = () => {
  const userData = useGlobalUserData();

  const user = userData?.user;
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!user) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton as={Box} display="flex">
          <HStack width="full">
            <Img
              rounded="full"
              width="32px"
              height="32px"
              src={
                user?.profile_id
                  ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${user.profile_id}`
                  : "/assets/images/default-avatar.png"
              }
              alt="user"
            />
            <Text
              width="100px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              color="gray.10"
              fontSize="md"
              fontWeight="200"
            >
              {user.display_name ?? user.email}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          border="none"
          width="290px"
          px="16px"
          py="24px"
          bg="gray.900"
          zIndex={2}
          cursor="default"
        >
          <HStack columnGap="8px" mb="16px" rowGap="8px">
            <Img
              rounded="full"
              width="64px"
              height="64px"
              src={
                user?.profile_id
                  ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${user.profile_id}`
                  : "/assets/images/default-avatar.png"
              }
              alt="profile"
            />
            <Text
              fontFamily="lexend"
              color="gray.0"
              fontSize="xl"
              fontWeight="600"
              width="full"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {user.display_name ?? user.email}
            </Text>
          </HStack>
          <VStack rowGap="16px">
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              as={Link}
              href={`/profile/${user?.id}`}
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbUserCircle fontSize="20px" />
                <Text>My Profile</Text>
              </HStack>
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              as={Link}
              href="/settings"
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbSettings2 fontSize="20px" />
                <Text>Account Setting</Text>
              </HStack>
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              height="48px"
              variant="primaryDark"
              width="full"
              onClick={onOpen}
            >
              <HStack width="full" justifyContent="flex-start" columnGap="8px">
                <TbLogout fontSize="20px" />
                <Text>Log Out</Text>
              </HStack>
            </Button>
          </VStack>
        </MenuList>
      </Menu>
      <Logout isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const NotificationEmptyState = () => {
  return (
    <VStack rowGap="16px" width="full">
      <Img src="/assets/images/notif-empty-state.png" />
      <Text
        fontFamily="lexend"
        color="gray.10"
        fontWeight="600"
        fontSize="xl"
        width="full"
        textAlign="center"
      >
        No new notifications right now. Stay tuned!
      </Text>
    </VStack>
  );
};

interface NotificationBodyProps {
  messages: any[];
  setMessages: Dispatch<SetStateAction<any>>;
}
const NotificationBody = ({ messages, setMessages }: NotificationBodyProps) => {
  return (
    <VStack
      maxHeight="398px"
      overflowY="auto"
      overflowX="hidden"
      rowGap="16px"
      width="full"
      height="fit-content"
    >
      <HStack width="full" justifyContent="space-between">
        <Text
          fontWeight="600"
          fontFamily="lexend"
          fontSize="xl"
          color="gray.10"
        >
          Notifications
        </Text>
        <Button
          onClick={() => {
            setMessages([]);
          }}
          px="0"
          size="md"
          color="gray.60"
          _hover={{ color: "gray.0", bg: "transparent" }}
          _active={{
            color: "orange.300",
            bg: "transparent",
          }}
          bg="transparent"
        >
          Clear All
        </Button>
      </HStack>
      <VStack width="full" rowGap="16px">
        <AnimatePresence>
          {messages.map((item, index) => (
            <motion.div
              key={item}
              exit={{
                transform: "translateX(400px)",
                opacity: 0,
              }}
              transition={{ delay: index * 0.2, duration: 0.2 }}
            >
              <NotificationItem
                key={item}
                message="A Badge Holder is now following you. You can now vote and review projects. Share your thoughts!"
                isSeen
                title="You've been upgraded!"
                ctaText="CTA"
                cta={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </VStack>
    </VStack>
  );
};

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const { isOpen: badgeIsOpen, onClose: badgeOnClose } = useDisclosure();

  const { isOpen, onClose, onOpen } = useWalletModal();

  const authorization = useAuthorization();

  const [searchedProjects, setSearchedProjects] = useState([]);
  const [searchedReviews, setSearchedReviews] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    if (search !== "") {
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
        });
    }
  }, [search]);

  return (
    <>
      <Alert
        mb="20px"
        display="flex"
        borderRadius="16px"
        status="warning"
        bg="orange.100"
      >
        <AlertIcon color="orange.400" />
        <Text fontSize="xs">
          Kindly note: The application is currently in development, and some
          functionalities may not be operational. We appreciate your
          understanding.
        </Text>
      </Alert>
      <HStack
        fontFamily="satoshi"
        justifyContent={{ base: "flex-start", md: "flex-end" }}
        columnGap="24px"
        width="full"
      >
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

          <Fade in={search != ""}>
            <VStack
              width="395px"
              maxH="580px"
              bg="gray.700"
              zIndex="dropdown"
              position="absolute"
              top="40px" // the height of the input group
              left="0"
              borderBottomRadius="27px"
              p="16px"
              pt="0"
              pr="8px"
            >
              <VStack
                borderTop="1px solid"
                borderTopColor="gray.400"
                pt="4px"
                w="full"
                overflowY="auto"
              >
                <VStack
                  pt="16px"
                  w="full"
                  gap="16px"
                  overflowX="hidden"
                  pr="8px"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(67, 67, 70, 1)",
                    },
                  }}
                >
                  {searchedUsers.length > 0 && (
                    <>
                      <VStack w="full" gap="12px" alignItems={"start"}>
                        <HStack w="full" justifyContent="space-between">
                          <HStack gap="6px">
                            <TbUsers color="var(--chakra-colors-gray-80)" />
                            <Text
                              color="gray.80"
                              fontSize="12px"
                              fontWeight="700"
                            >
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

                        <HStack
                          w="full"
                          gap="8px"
                          overflow="auto"
                          whiteSpace={"nowrap"}
                          pb={"4px"}
                        >
                          <Swiper
                            direction="horizontal" // Ensures the swiper is horizontal
                            spaceBetween={8} // Gap between slides
                            slidesPerView="auto" // Show as many slides as fit in the view
                            freeMode={true} // Enables free scrolling
                            style={{ overflow: "visible" }} // Allows for visible overflow outside the container
                          >
                            {searchedUsers.map((item, index) => (
                              <SwiperSlide
                                key={index}
                                style={{
                                  width: "auto",
                                  display: "inline-flex",
                                }} // Auto width for slide
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
                          {/* <PeopleCard name="payam" />
                      <PeopleCard name="haj popol" /> */}
                        </HStack>
                      </VStack>
                      <Divider />
                    </>
                  )}

                  {searchedProjects.length > 0 && (
                    <>
                      <VStack w="full" gap="12px" alignItems={"start"}>
                        <HStack w="full" justifyContent="space-between">
                          <HStack gap="6px">
                            <TbFiles color="var(--chakra-colors-gray-80)" />
                            <Text
                              color="gray.80"
                              fontSize="12px"
                              fontWeight="700"
                            >
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
                              <Text
                                color="gray.60"
                                fontSize="12px"
                                fontWeight="700"
                              >
                                Show All
                              </Text>
                              <TbChevronRight color="var(--chakra-colors-gray-60)" />
                            </HStack>
                          </Link>
                        </HStack>

                        <Box
                          w="full"
                          overflow="auto"
                          whiteSpace={"nowrap"}
                          pb={"4px"}
                        >
                          <Swiper
                            direction="horizontal" // Ensures the swiper is horizontal
                            spaceBetween={8} // Gap between slides
                            slidesPerView="auto" // Show as many slides as fit in the view
                            freeMode={true} // Enables free scrolling
                            style={{ overflow: "visible" }} // Allows for visible overflow outside the container
                          >
                            {searchedProjects.map((item, index) => (
                              <SwiperSlide
                                key={index}
                                style={{
                                  width: "auto",
                                  display: "inline-flex",
                                }} // Auto width for slide
                              >
                                <ProjectCard
                                  id={item?.id.toString()}
                                  setSearch={setSearch}
                                  name={item.name}
                                  search={search}
                                  imageUrl={
                                    item.content.profile?.profileImageUrl
                                  }
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          {/* {searchedProjects.map((item) => (
                        <ProjectCard name={item.name} search={search} />
                      ))} */}
                        </Box>
                      </VStack>
                      <Divider />
                    </>
                  )}
                  {searchedReviews.length > 0 && (
                    <>
                      <VStack w="full" gap="12px" alignItems={"start"}>
                        <HStack w="full" justifyContent="space-between">
                          <HStack gap="6px">
                            <TbMessage color="var(--chakra-colors-gray-80)" />
                            <Text
                              color="gray.80"
                              fontSize="12px"
                              fontWeight="700"
                            >
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
                              <Text
                                color="gray.60"
                                fontSize="12px"
                                fontWeight="700"
                              >
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
                          {/* <ReviewCard
                        title="Preview Title"
                        text={"Reprehenderit eu sint veniam eu esse. "}
                        date="2024-02-26, 14:05"
                        name="NickName"
                      />
                      <ReviewCard
                        title="Preview Title"
                        text={
                          "Reprehenderit eu sint veniam eu esse. Do non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. Dolor non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. Dolor non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. "
                        }
                        date="2024-02-26, 14:05"
                        name="NickName"
                      />
                      <ReviewCard
                        title="Preview Title"
                        text={
                          "Reprehenderit eu sint veniam eu esse. Do non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. Dolor non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. Dolor non voluptate duis veniam ad qui do aute anim Lorem mollit aliqua. "
                        }
                        date="2024-02-26, 14:05"
                        name="NickName"
                      /> */}
                        </VStack>
                        {/* <Box w="full">
                      <Swiper
                        direction="vertical" // Ensures the swiper is horizontal
                        spaceBetween={12} // Gap between slides
                        slidesPerView="auto" // Show as many slides as fit in the view
                        freeMode={true} // Enables free scrolling
                        style={{ overflow: "visible" }} // Allows for visible overflow outside the container
                      >
                        {searchedReviews.map((item, index) => (
                          <SwiperSlide
                            key={index}
                            style={{ width: "100%" }} // Auto width for slide
                          >
                            <ReviewCard
                              title={item.title}
                              text="text"
                              name="nickName"
                              date="date"
                              search={search}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box> */}
                      </VStack>
                    </>
                  )}
                </VStack>
              </VStack>
            </VStack>
          </Fade>
        </VStack>
        {!!authorization && (
          <Box cursor="pointer" onClick={() => {}} position="relative">
            {true && (
              <Text
                textAlign="center"
                fontSize="10px"
                fontWeight="bold"
                margin="0px !important"
                padding="0px"
                lineHeight="16px"
                rounded="full"
                minHeight="16px"
                minWidth="16px"
                bg="red.300"
                color="gray.0"
                position="absolute"
                right="-5px"
                top="-5px"
              >
                1
              </Text>
            )}
            <Popover>
              <PopoverTrigger>
                <Button
                  maxWidth="24px"
                  maxH="24px"
                  minWidth="24px"
                  padding="0"
                  width="fit-content"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                >
                  <TbBell fontSize="24px" color="var(--chakra-colors-gray-0)" />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverArrow bg="transparent" color="transparent" />
                <PopoverContent
                  p="24px 0px"
                  borderRadius="12px"
                  border="none"
                  bg="gray.800"
                >
                  <PopoverBody>
                    {messages.length === 0 ? (
                      <NotificationEmptyState />
                    ) : (
                      <NotificationBody
                        messages={messages}
                        setMessages={setMessages}
                      />
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>
        )}
        <HStack cursor="pointer" columnGap="8px">
          {!authorization ? (
            <Button
              onClick={onOpen}
              borderRadius="8px"
              height="40px"
              px="28px"
              variant="primary"
            >
              Connect
            </Button>
          ) : (
            <ProfileBox />
          )}
        </HStack>
      </HStack>
      <ConnectModal isOpen={isOpen} onClose={onClose} />
      <BadgeModal
        badgeType={Badges["HOLDER"]}
        isOpen={badgeIsOpen}
        onClose={badgeOnClose}
      />
    </>
  );
};

export default Navbar;
