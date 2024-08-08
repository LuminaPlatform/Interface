import {
  Button,
  Text,
  useDisclosure,
  UseDisclosureProps,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ReviewStatus } from "@/types";
import { TbEdit, TbMessage2Plus } from "react-icons/tb";
import { ModalBase } from "@/components/ModalBase";
import { reviewStatuses } from "@/constant";
import { axiosClient } from "@/config/axios";
import { apiKeys } from "@/api/apiKeys";
import WriteFeedback from "./WriteFeedback";
import { FeedbackResult } from "./FeedbackResult";
import {
  useProjectData,
  useProjectDataDispatch,
  useProjectReviews
} from "../hooks";
import { ImportReview } from "./ImportReview";

interface FeedbackProps extends UseDisclosureProps {
  headerTitle: string;
}
export const Feedback = ({
  headerTitle,
  isOpen,
  onClose,
  onOpen
}: FeedbackProps) => {
  const userViewpoint = useProjectData()?.userViewpoint;
  const project = useProjectData();
  const reviews = useProjectReviews();

  const dispatchProjectData = useProjectDataDispatch();
  const {
    onClose: onCloseImportReview,
    onOpen: onOpenImportReview,
    isOpen: isOpenImportReview
  } = useDisclosure();
  const [status, setStatus] = useState<ReviewStatus["name"]>(
    () =>
      reviewStatuses.find((item) => item.name === userViewpoint?.[0]?.viewpoint)
        ?.name ?? undefined
  );

  const hasAccessWriteReview = !!project.userRole.find((role: any) =>
    role.name.includes("BETA_USER")
  );

  useEffect(() => {
    if (typeof status !== "undefined") {
      axiosClient
        .post(
          userViewpoint.length !== 0 ? apiKeys.update : apiKeys.create,
          userViewpoint.length !== 0
            ? {
                0: {
                  model_name: "ViewPoint",
                  params: {
                    project_id: project.id,
                    viewpoint: status
                  },
                  id: userViewpoint[0]?.id
                }
              }
            : {
                0: {
                  model_name: "ViewPoint",
                  params: {
                    project_id: project.id,
                    viewpoint: status
                  }
                }
              }
        )
        .then((response) => {
          axiosClient.get(`${apiKeys.viewpoint}/${project.id}`).then((res) => {
            dispatchProjectData({
              ...project,
              userViewpoint: [response.data[0]],
              viewpoints: res.data.viewpoints
            });
          });
        });
    }
  }, [status]);

  return (
    <VStack rowGap="24px" height="auto" width="full">
      <VStack width="full" rowGap="16px">
        <Text
          fontSize="lg"
          color="gray.20"
          fontWeight="500"
          lineHeight="28.8px"
          textAlign="left"
        >
          {headerTitle}
        </Text>
        <FeedbackResult
          status={status}
          setStatus={setStatus}
          hasAccessWriteReview={hasAccessWriteReview}
        />
        <Text mr="auto" color="gray.60" fontSize="xs" fontWeight="500">
          Based on 604 rating
        </Text>

        {hasAccessWriteReview && reviews.length !== 0 && (
          <>
            <Button
              onClick={onOpen}
              size="md"
              leftIcon={<TbEdit />}
              width="full"
              variant="outline"
            >
              Write a Review
            </Button>
            <Button
              onClick={onOpenImportReview}
              size="md"
              leftIcon={<TbMessage2Plus />}
              width="full"
              variant="ghost"
            >
              Import a Review
            </Button>
          </>
        )}
      </VStack>
      {hasAccessWriteReview && (
        <>
          <ModalBase
            modalBody={
              <WriteFeedback
                onClose={onClose}
                setStatus={setStatus}
                status={status}
              />
            }
            isOpen={isOpen}
            onClose={onClose}
          />
          <ModalBase
            modalBody={<ImportReview onClose={onCloseImportReview} />}
            isOpen={isOpenImportReview}
            onClose={onCloseImportReview}
          />
        </>
      )}
    </VStack>
  );
};
