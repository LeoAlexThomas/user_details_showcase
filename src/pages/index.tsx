import {
  convertFirstLetterUpperCase,
  createUserFormId,
  filterFormId,
  getIsUserRolePresent,
} from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import {
  CreateUserInterface,
  PaginationInterface,
  RoleEnum,
  UserFilterForm,
  UserInterface,
} from "@/types/user";
import {
  Badge,
  Box,
  Button,
  Center,
  Grid,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { Refresh } from "@emotion-icons/evaicons-solid/Refresh";
import { Filter } from "@emotion-icons/fa-solid/Filter";
import { Delete } from "@emotion-icons/fluentui-system-regular/Delete";
import { UserAdd } from "@emotion-icons/typicons/UserAdd";
import { mutate } from "swr";
import { isEmpty, isNil, isString, random } from "lodash";
import CustomModal from "@/components/CustomModal";
import FilterForm from "@/components/FilterForm";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import CreateUserForm from "@/components/CreateUserForm";
import useCustomToast, { ToastStatusEnum } from "@/hooks/useCustomToast";

const HomePage = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const userFilterForm = useForm<UserFilterForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      companyName: "",
      role: null,
    },
  });

  const handleFormReset = () => {
    userFilterForm.reset();
    router.push(`/`);
  };

  const getFormFooter = () => {
    return (
      <HStack w="100%" justifyContent="space-between">
        <Button variant="ghost" onClick={handleFormReset}>
          Reset
        </Button>
        <HStack>
          <Button type="submit" form={filterFormId}>
            Filter
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </HStack>
      </HStack>
    );
  };

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
        {/* --------- FilterModel ------------ */}
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title="Filter"
          footer={getFormFooter()}
          footerProps={{
            justifyContent: "space-between",
          }}
        >
          <FilterForm form={userFilterForm} />
        </CustomModal>
        <Header onFilterPressed={onOpen} />

        <WithLoader apiUrl="/users">
          {({ data }: { data: PaginationInterface<UserInterface> }) => {
            return <UserList users={data.users} onReset={handleFormReset} />;
          }}
        </WithLoader>
      </VStack>
    </>
  );
};

const Header = ({ onFilterPressed }: { onFilterPressed: () => void }) => {
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
      <HStack spacing={4}>
        <IconButton
          aria-label="Filter"
          icon={<Filter size={"20px"} />}
          onClick={onFilterPressed}
        />
        <IconButton
          aria-label="refresh"
          icon={<Refresh size={"20px"} />}
          onClick={handleRefresh}
        />
      </HStack>
    </HStack>
  );
};

const UserList = ({
  users,
  onReset,
}: {
  users: UserInterface[];
  onReset: () => void;
}) => {
  const router = useRouter();
  const { showToast } = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>(users);
  useEffect(() => {
    updateUserListByFiltering(filteredUsers);
  }, [router.query, users]);

  const handleAddNewUser = (values: CreateUserInterface) => {
    const newUser: UserInterface = {
      id: users.length + random(1000, 5000),
      ...values,
    };
    // console.log("Adding new user: ", newUser);
    setFilteredUsers([...filteredUsers, newUser]);
    updateUserListByFiltering([...filteredUsers, newUser]);
    onClose();
    showToast({
      title: "New User Added",
      status: ToastStatusEnum.success,
      duration: 3000,
      isClosable: true,
    });
  };

  const getFormFooter = () => {
    return (
      <HStack>
        <Button type="submit" form={createUserFormId}>
          Create
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </HStack>
    );
  };

  const updateUserListByFiltering = (userList: UserInterface[]) => {
    const { name, companyName, role } = router.query;
    const applyNameFilter = !isNil(name) && isString(name) && !isEmpty(name);
    const applyCompanyNameFilter =
      !isNil(companyName) && isString(companyName) && !isEmpty(companyName);
    const applyRoleFilter =
      !isNil(role) &&
      isString(role) &&
      !isEmpty(role) &&
      getIsUserRolePresent(role as string);
    if (!applyNameFilter && !applyCompanyNameFilter && !applyRoleFilter) {
      return;
    }
    const updatedUsers = userList.filter((user) => {
      return (
        user.username
          .toLowerCase()
          .includes(name?.toString()?.toLowerCase() ?? "") &&
        user.company?.name
          .toLowerCase()
          .includes(companyName?.toString()?.toLowerCase() ?? "") &&
        user.role === role
      );
    });
    setFilteredUsers(updatedUsers);
  };

  const handleDelete = (userId: number) => {
    setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
  };

  if (isEmpty(filteredUsers)) {
    return <UserNotFound onReset={onReset} />;
  }
  return (
    <>
      {/* --------- User Creating Model ------------ */}
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title="Create User"
        footer={getFormFooter()}
      >
        <CreateUserForm addUser={handleAddNewUser} />
      </CustomModal>
      <SimpleGrid
        templateColumns={["1fr", null, "1fr 1fr", null, null, "1fr 1fr 1fr"]}
        spacing={4}
        p={4}
      >
        {filteredUsers.map((user) => (
          <Fragment key={user.id}>
            <UserCard userData={user} onDelete={() => handleDelete(user.id)} />
          </Fragment>
        ))}
      </SimpleGrid>
      <AddNewUser onClick={onOpen} />
    </>
  );
};

const AddNewUser = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      aria-label="Add User"
      bg="blue"
      borderRadius="full"
      icon={<UserAdd size="25px" color="white" />}
      onClick={onClick}
      position="fixed"
      bottom={10}
      right={10}
    />
  );
};

const UserNotFound = ({ onReset }: { onReset: () => void }) => {
  return (
    <Center h="90vh">
      <VStack spacing={4} p={6}>
        <Text fontFamily="Noto Serif" fontSize={["16px", null, "20px"]}>
          User not found
        </Text>
        <Button onClick={onReset}>Reset</Button>
      </VStack>
    </Center>
  );
};

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
        <Image src={userData.image} alt={userData.username} fit="contain" />
        <VStack alignItems="stretch" spacing={2}>
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

export default HomePage;
