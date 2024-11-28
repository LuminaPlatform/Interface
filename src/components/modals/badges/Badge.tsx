import { UseDisclosureProps } from "@chakra-ui/react";
import { Badges } from "@/types";
import { ModalBase } from "../../ModalBase";
import { BasicBadge } from "./BasicBadge";

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
