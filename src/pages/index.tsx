import { convertFirstLetterUpperCase } from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import { PaginationInterface, RoleEnum, UserInterface } from "@/types/user";
import {
  Badge,
  Box,
  Grid,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { Fragment, useState } from "react";
import { Refresh } from "@emotion-icons/evaicons-solid/Refresh";
import { mutate } from "swr";
import { isNil } from "lodash";

const HomePage = () => {
  const [searchUserName, setSearchUserName] = useState<string>("");
  const [searchCompanyName, setSearchCompanyName] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<RoleEnum | null>(null);

  return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      <VStack
        h="100%"
        w="100%"
        backgroundColor="gray.300"
        spacing={4}
        alignItems="stretch"
      >
        <Header />
        <Input
          placeholder="Search by user name"
          value={searchUserName}
          onChange={(e) => setSearchUserName(e.target.value)}
        />
        <Input
          placeholder="Search by company name"
          value={searchCompanyName}
          onChange={(e) => setSearchCompanyName(e.target.value)}
        />
        <Select
          value={selectedRole ?? ""}
          onChange={(e) => setSelectedRole(e.target.value as RoleEnum)}
        >
          <option value={RoleEnum.admin}>Admin</option>
          <option value={RoleEnum.moderator}>Moderator</option>
          <option value={RoleEnum.user}>User</option>
        </Select>
        <WithLoader apiUrl="/users">
          {({ data }: { data: PaginationInterface<UserInterface> }) => {
            return (
              <UserList
                users={data.users}
                searchUserName={searchUserName}
                searchCompanyName={searchCompanyName}
                selectedRole={selectedRole}
              />
            );
          }}
        </WithLoader>
      </VStack>
    </>
  );
};

const Header = () => {
  const handleRefresh = () => {
    mutate("/users");
  };

  return (
    <HStack
      h="70px"
      w="100%"
      bg="gray.300"
      p={4}
      justifyContent="space-between"
    >
      <Text
        fontFamily="Playfair Display"
        fontSize={["24px", null, "32px"]}
        fontWeight={700}
        lineHeight="1.25"
      >
        User Details
      </Text>
      <IconButton
        aria-label="refresh"
        icon={<Refresh size={"20px"} />}
        onClick={handleRefresh}
      />
    </HStack>
  );
};

const UserList = ({
  users,
  searchUserName,
  searchCompanyName,
  selectedRole,
}: {
  users: UserInterface[];
  searchUserName: string;
  searchCompanyName: string;
  selectedRole: RoleEnum | null;
}) => {
  return (
    <SimpleGrid
      templateColumns={["1fr", null, "1fr 1fr", "1fr 1fr 1fr"]}
      spacing={4}
      p={4}
    >
      {users
        .filter(
          (user) =>
            user.username
              .toLowerCase()
              .includes(searchUserName.toLowerCase()) ||
            user.company.name
              .toLowerCase()
              .includes(searchCompanyName.toLowerCase()) ||
            (!isNil(selectedRole) && selectedRole === user.role)
        )
        .map((user) => (
          <Fragment key={user.id}>
            <UserCard userData={user} />
          </Fragment>
        ))}
    </SimpleGrid>
  );
};

const UserCard = ({ userData }: { userData: UserInterface }) => {
  return (
    <Box
      backgroundColor="white"
      borderRadius="8px"
      border="1px solid black"
      p={4}
    >
      <SimpleGrid
        templateColumns={["50px 1fr", null, null, "100px 1fr"]}
        spacing={4}
      >
        <Image src={userData.image} alt={userData.username} />
        <VStack alignItems="stretch" spacing={2}>
          <Text
            fontFamily="Playfair Display"
            fontSize={["16px", null, "20px"]}
            fontWeight={700}
            noOfLines={1}
          >
            {convertFirstLetterUpperCase(userData.username)} ({userData.email})
          </Text>
          <Text fontFamily="Noto Serif" fontSize={["12px", null, "16px"]}>
            {userData.company.name}
          </Text>
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
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
