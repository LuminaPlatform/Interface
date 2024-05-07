import { ModalBase } from "@/components/ModalBase";
import {
  Box,
  Button,
  CloseButton,
  HStack,
  Tag,
  TagLabel,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { InterestModalBody } from "../types";
import { CategoryModal } from "./modals/CategoryModal";
import { SettingsModalsHeader } from "./SettingsModalHeader";

const interests = [
  {
    id: 0,
    title: "Metaverse",
  },
  {
    id: 0,
    title: "Lend & Borrow",
  },
];
const projectData = [
  {
    id: 0,
    title: "DeFi",
  },
  {
    id: 1,
    title: "DeFi1",
  },
  {
    id: 2,
    title: "DeFi2",
  },
  {
    id: 3,
    title: "DeFi3",
  },
  {
    id: 4,
    title: "DeFi4",
  },
  {
    id: 5,
    title: "DeFi5",
  },
];
const peopleData = [
  {
    id: 0,
    title: "DeFi",
  },
  {
    id: 1,
    title: "DeFi1",
  },
  {
    id: 2,
    title: "DeFi2",
  },
  {
    id: 3,
    title: "DeFi3",
  },
  {
    id: 4,
    title: "DeFi4",
  },
  {
    id: 5,
    title: "DeFi5",
  },
];
export const Interests = () => {
  const [projects, setProjects] = useState([]);
  const [selectedPeoples, setSelectedPeoples] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [categoryModalType, setCategoryModalType] = useState<
    InterestModalBody | undefined
  >(undefined);

  const modalBody = {
    [InterestModalBody.projects]: {
      component: (
        <CategoryModal
          onClose={onClose}
          selectedData={projects}
          setData={setProjects}
          title="Choose categories that align with your interests to discover projects you’ll love to follow and participate in!"
          data={projectData}
        />
      ),
      header: "Project",
    },
    [InterestModalBody.people]: {
      component: (
        <CategoryModal
          onClose={onClose}
          selectedData={selectedPeoples}
          setData={setSelectedPeoples}
          title="Pick categories based on what the people you want to follow are great at.
        This way, you connect with the right crowd!"
          data={peopleData}
        />
      ),
      header: "People",
    },
  };

  console.log(projects);

  return (
    <>
      <VStack
        rowGap="16px"
        zIndex={1}
        borderRadius="12px"
        width="full"
        p="24px"
        bg="gray.800"
      >
        <Text
          mb="8px"
          textAlign="left"
          width="full"
          color="gray.40"
          fontFamily="lexend"
          fontSize="xl"
          fontWeight="600"
        >
          Interests
        </Text>

        <VStack p="16px" borderRadius="12px" bg="gray.700" width="full">
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="md" fontWeight="700" color="gray.40">
              Projects
            </Text>
            <Button
              size="sm"
              borderRadius="17px"
              leftIcon={<TbPlus />}
              variant="outline"
              onClick={() => {
                setCategoryModalType(InterestModalBody.projects);
                onOpen();
              }}
            >
              Add Categories
            </Button>
          </HStack>
          <HStack width="full" flexWrap="wrap">
            {projects.map((item) => (
              <Tag
                key={item.id}
                minWidth="75px"
                size="sm"
                variant="lightOrange"
                columnGap="8px"
              >
                <CloseButton
                  w="16px"
                  height="16px"
                  size="sm"
                  color="gray.300"
                />
                <TagLabel>{item.title}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </VStack>
        <VStack p="16px" borderRadius="12px" bg="gray.700" width="full">
          <HStack justifyContent="space-between" width="full">
            <Text fontSize="md" fontWeight="700" color="gray.40">
              People
            </Text>
            <Button
              onClick={() => {
                setCategoryModalType(InterestModalBody.people);
                onOpen();
              }}
              size="sm"
              borderRadius="17px"
              leftIcon={<TbPlus />}
              variant="outline"
            >
              Add Categories
            </Button>
          </HStack>
          <HStack width="full" flexWrap="wrap">
            {selectedPeoples.map((item) => (
              <Tag
                key={item.id}
                minWidth="75px"
                size="sm"
                variant="lightOrange"
                columnGap="8px"
              >
                <CloseButton
                  w="16px"
                  height="16px"
                  size="sm"
                  color="gray.300"
                />
                <TagLabel>{item.title}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </VStack>
      </VStack>
      {typeof categoryModalType !== "undefined" && (
        <ModalBase
          isOpen={isOpen}
          modalBody={modalBody[categoryModalType].component}
          modalHeader={
            <SettingsModalsHeader text={modalBody[categoryModalType].header} />
          }
          onClose={onClose}
        />
      )}
    </>
  );
};
