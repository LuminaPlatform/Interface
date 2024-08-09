// import { apiKeys } from "@/api/apiKeys";
import { Avatar } from "@/components/AvatarText";
// import { axiosClient } from "@/config/axios";
// import { ACCESS_TOKEN_COOKIE_KEY } from "@/constant";
import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
// import { getCookie } from "cookies-next";
// import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { TbBrandX, TbTrash } from "react-icons/tb";

interface PostType {
  post: any;
  setPost?: Dispatch<SetStateAction<any>>;
}
interface ImportedReviewBoxProps extends PostType {
  isChild: boolean;
  writerName: string;
  isLastChild: boolean;
  posts: any;
}
export const ImportedReviewBoxContent = ({
  post,
  isChild,
  isLastChild,
  writerName,
  posts,
  setPost
}: ImportedReviewBoxProps) => {
  return (
    <>
      <VStack position="relative" width="full">
        <HStack width="full">
          <HStack columnGap={isChild ? "16px" : "8px"} width="full">
            <Avatar
              hasBadge={false}
              imageStyle={{
                boxSize: "36px"
              }}
              badgeSize={0}
              src="/assets/images/default-avatar.png"
            />
            <Text fontSize="md" fontWeight="700" color="gray.40">
              {writerName}
            </Text>
          </HStack>
          {isChild ? (
            <TbTrash
              onClick={() => {
                const filteredThreads = posts.thread.filter(
                  (item: string) => item !== post
                );
                setPost(filteredThreads);
              }}
              cursor="pointer"
              color="var(--chakra-colors-gray-60)"
              fontSize="24px"
            />
          ) : (
            <TbBrandX color="var(--chakra-colors-gray-20)" fontSize="24px" />
          )}
        </HStack>
        {isChild && !isLastChild && (
          <Box
            position="absolute"
            top="36px"
            left="18px"
            bg="gray.0"
            height="full"
            width="1px"
          />
        )}
        <Box
          {...(isChild && {
            ml: "52px"
          })}
        >
          <Text fontSize="lg" color="gray.40" lineHeight="28.8px">
            {post}
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export const ImportedReviewBox = ({ post, setPost }: PostType) => {
  // const { query } = useRouter();
  const [isLoading, setLoading] = useState(false);

  return (
    <VStack rowGap="16px">
      <VStack
        bg="gray.600"
        border="0.5px solid"
        borderColor="rgba(255,255,255,0.2)"
        rowGap="12px"
        width="full"
        p="14px 16px"
        borderRadius="12px"
      >
        {post?.thread?.map((item: string, index: number) => (
          <ImportedReviewBoxContent
            setPost={setPost}
            isLastChild={index + 1 === post?.thread.length}
            isChild={index !== 0}
            writerName={post?.writer}
            key={item}
            posts={post}
            post={item}
          />
        ))}
      </VStack>
      <HStack width="full" justifyContent="flex-end">
        <Button variant="outline">Cancel</Button>
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={() => {
            setLoading(true);
            // const postDTO = [
            //   ...post.thread,
            //   ...post.thread,
            //   ...post.thread
            // ].join("\n ");
            // const postData = {
            //   0: {
            //     model_name: "Review",
            //     params: {
            //       // title: data.title,
            //       description: postDTO,
            //       project_id: +query.projectId
            //     }
            //   }
            // };
            // console.log({ postDTO });

            // axiosClient.post(apiKeys.create, postData, {
            //   headers: {
            //     Authorization: `Bearer ${getCookie(ACCESS_TOKEN_COOKIE_KEY)}`
            //   }
            // }).finally(()=>{
            //   setLoading(false)
            // });
          }}
          variant="primary"
        >
          Confirm
        </Button>
      </HStack>
    </VStack>
  );
};
