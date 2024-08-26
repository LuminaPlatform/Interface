import { Avatar, AvatarText } from "@/components/AvatarText";
import { ModalBase } from "@/components/ModalBase";
import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TbSearch, TbUserCheck, TbUserPlus } from "react-icons/tb";
import { useDispatchGlobalUserData, useGlobalUserData } from "@/hooks/bases";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import { getCookie } from "cookies-next";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { useDispatchUserProfile, useUserProfile } from "../hooks";

interface UnFollowModalProps {
  onClose: UseDisclosureProps["onClose"];
  user: any;
}
const UnFollowModal = ({ onClose, user }: UnFollowModalProps) => {
  const [isLoading, setLoading] = useState(false);
  const globalUser = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();

  const userProfile = useUserProfile();
  const dispatchUserProfile = useDispatchUserProfile();
  return (
    <VStack rowGap={4}>
      <Avatar
        badgeSize={{}}
        imageStyle={{
          width: 20
        }}
        hasBadge={false}
        src={
          user.profile_id
            ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${user.profile_id}`
            : "/assets/images/default-img.png"
        }
      />
      <Text color="gray.40" fontWeight="500" fontSize="lg">
        {user.display_name}
      </Text>
      <Text
        color="gray.0"
        lineHeight="base"
        fontSize="lg"
        textAlign="center"
        maxW="362px"
      >
        Unfollowing this user will revoke their voting and review privileges
        that you granted. Are you sure you want to unfollow?{" "}
      </Text>
      <HStack mt={4} width="full" columnGap={4}>
        <Button onClick={onClose} flex={1} variant="outline">
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={() => {
            setLoading(true);
            axiosClient
              .post(
                apiKeys.relation.remove,
                {
                  "0": {
                    model_name: "User",
                    params: {
                      following: [user.id]
                    },
                    id: globalUser.user.id
                  }
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie(
                      ACCESS_TOKEN_COOKIE_KEY
                    )}`
                  }
                }
              )
              .then(() => {
                return axiosClient
                  .post(apiKeys.fetch, {
                    0: {
                      model: "User.following",
                      model_id: globalUser.user.id,
                      orders: [],
                      graph: {
                        fetch_fields: [
                          {
                            name: "*"
                          }
                        ]
                      }
                    }
                  })
                  .then(() => {
                    const filteredGlobalUserFollowings =
                      globalUser.followings.filter(
                        (item: any) => item.id !== user.id
                      );
                    const filteredProfileFollowings =
                      userProfile.followings.filter(
                        (item: any) => item.id !== user.id
                      );
                    dispatchGlobalUser({
                      ...globalUser,
                      followings: filteredGlobalUserFollowings
                    });
                    dispatchUserProfile({
                      ...userProfile,
                      followings: filteredProfileFollowings
                    });
                    onClose();
                  });
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          flex={1}
          variant="primary"
        >
          Unfollow
        </Button>
      </HStack>
    </VStack>
  );
};

interface UserFollowBoxProps {
  item: any;
  type: "FOLLOWERS" | "FOLLOWING";
}
const UserFollowBox = ({ item, type }: UserFollowBoxProps) => {
  const userInfo = useUserProfile();
  const globalUser = useGlobalUserData();
  const dispatchGlobalUser = useDispatchGlobalUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useState(false);

  const isFollowed = useMemo(() => {
    if (type === "FOLLOWERS") {
      return (
        globalUser?.followings?.find(
          (following: any) => following?.id === item.id
        ) ?? false
      );
    }
    return (
      globalUser?.followers?.find(
        (follower: any) => follower?.id === item.id
      ) ?? false
    );
  }, [globalUser]);

  const dispatchProfile = useDispatchUserProfile();

  return (
    <>
      <HStack px="24px" py="12px" width="full" justifyContent="space-between">
        <AvatarText
          badgeSize="18px"
          src={
            item.profile_id
              ? `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/${item.profile_id}`
              : "/assets/images/default-img.png"
          }
          textStyle={{ fontSize: "md", fontWeight: "500", color: "gray.0" }}
          name={item.display_name}
          hasBadge
          imageStyle={{ width: "64px", height: "64px", objectFit: "contain" }}
        />
        {item.id !== globalUser?.user.id &&
          !!globalUser &&
          (isFollowed ? (
            <Button
              size="sm"
              leftIcon={<TbUserCheck />}
              background="gray.40"
              color="gray.500"
              onClick={() => {
                onOpen();
              }}
            >
              Following
            </Button>
          ) : (
            <Button
              isLoading={isLoading}
              size="sm"
              onClick={() => {
                setLoading(true);
                axiosClient
                  .post(
                    apiKeys.relation.add,
                    {
                      "0": {
                        model_name: "User",
                        params: {
                          following: [item.id]
                        },
                        id: globalUser.user.id
                      }
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${getCookie(
                          ACCESS_TOKEN_COOKIE_KEY
                        )}`
                      }
                    }
                  )
                  .then(() => {
                    return axiosClient
                      .post(apiKeys.fetch, {
                        0: {
                          model: "User.following",
                          model_id: globalUser.user.id,
                          orders: [],
                          graph: {
                            fetch_fields: [
                              {
                                name: "*"
                              }
                            ]
                          }
                        }
                      })
                      .then((res) => {
                        dispatchGlobalUser({
                          ...globalUser,
                          followings: [...globalUser.followings, ...res.data[0]]
                        });

                        dispatchProfile({
                          ...userInfo,
                          followings: [...userInfo.followings, ...res.data[0]],
                          isCurrentProfileFollowed: true
                        });
                      });
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              leftIcon={<TbUserPlus />}
              variant="primary"
            >
              Follow
            </Button>
          ))}
      </HStack>
      <ModalBase
        isOpen={isOpen}
        modalBody={<UnFollowModal user={item} onClose={onClose} />}
        onClose={onClose}
        showCloseButton={false}
      />
    </>
  );
};

interface UsersModalProps {
  type: "FOLLOWERS" | "FOLLOWING";
}
export const UsersModal = ({ type }: UsersModalProps) => {
  const { followers, followings } = useUserProfile();
  const users = useMemo(() => {
    if (type === "FOLLOWERS") {
      return followers;
    }
    return followings;
  }, [type, followers, followings]);

  const [search, setSearch] = useState("");
  const filteredUsers = useMemo(
    () =>
      search
        ? (users.filter((item: any) => {
            return item.email?.includes(search);
          }) ?? [])
        : users,

    [search, users]
  );
  return (
    <>
      <InputGroup position="relative" mb="16px" width="full">
        <InputLeftElement
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
        >
          <TbSearch size={24} color="var(--chakra-colors-gray-100)" />
        </InputLeftElement>
        <Input
          px="16px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="gray.600"
          border="1px solid"
          borderColor="gray.200"
          _hover={{
            borderColor: "gray.300"
          }}
          _active={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "gray.400" }}
          boxShadow="none !important"
          outline="none"
          fontFamily="satoshi"
          fontSize="md"
          color="gray.100"
          fontWeight="regular"
          _placeholder={{
            fontWeight: "regular",
            color: "gray.100"
          }}
          borderRadius="27px"
          height="30px"
          placeholder="Search"
        />
      </InputGroup>
      <VStack
        maxHeight="632px"
        overflow="auto"
        borderRadius="10px"
        divider={<Divider borderColor="gray.600" opacity="0.5" />}
        bg="gray.700"
      >
        {filteredUsers?.map((item: any) => (
          <UserFollowBox type={type} item={item} key={item} />
        ))}
      </VStack>
    </>
  );
};
