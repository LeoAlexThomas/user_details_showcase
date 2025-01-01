import { UserInterface } from "@/types/user";
import {
  useBreakpointValue,
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  IconButton,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";
import isNil from "lodash/isNil";
import { convertFirstLetterUpperCase } from "./utils";

const UserCard = ({
  userData,
  onDelete,
}: {
  userData: UserInterface;
  onDelete: () => void;
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      backgroundColor="white"
      borderRadius="8px"
      border="1px solid #50505090"
      p={4}
      boxShadow="base"
      _hover={{
        boxShadow: "0px 0px 10px #00000050",
        transform: isMobile ? "none" : "scale(1.02)",
      }}
    >
      <SimpleGrid
        templateColumns={["1fr", "100px 1fr", "1fr", "100px 1fr"]}
        spacing={2}
      >
        <Avatar
          name={userData.username}
          src={userData.image}
          size="xl"
          boxShadow="lg"
        />
        <VStack alignItems="stretch" spacing={2} h="auto">
          <Text
            fontFamily="Playfair Display"
            fontSize={["16px", null, "20px"]}
            fontWeight={700}
            noOfLines={2}
          >
            {convertFirstLetterUpperCase(userData.username)} ({userData.email})
          </Text>
          {!isNil(userData.company) && (
            <Text fontFamily="Noto Serif" fontSize={["12px", null, "16px"]}>
              {userData.company?.name}
            </Text>
          )}
          <HStack justifyContent="space-between">
            <Badge
              variant="outline"
              w="fit-content"
              borderRadius="8px"
              fontSize="12px"
              p={2}
              colorScheme="blue"
            >
              {userData.role}
            </Badge>
            <IconButton
              aria-label="delete"
              variant="outline"
              border="1px solid red"
              size="sm"
              icon={<Delete color="red" size="25px" />}
              onClick={onDelete}
            />
          </HStack>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default UserCard;
