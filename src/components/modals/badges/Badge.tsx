import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { ModalBase } from "../../ModalBase";
import { BasicBadge } from "./BasicBadge";
import { Badges } from "@/types";

interface BadgeModalProps extends UseDisclosureProps {
  badgeType: Badges;
}

export const BadgeModal = ({ isOpen, onClose, badgeType }: BadgeModalProps) => {
  return (
    <ModalBase
      size="xs"
      isOpen={isOpen}
      modalBody={<BasicBadge onClose={onClose} badgeType={badgeType} />}
      onClose={onClose}
      showCloseButton={false}
    />
  );
};
