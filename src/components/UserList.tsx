import useCustomToast, { ToastStatusEnum } from "@/hooks/useCustomToast";
import { CreateUserInterface, UserInterface } from "@/types/user";
import {
  useDisclosure,
  HStack,
  Button,
  SimpleGrid,
  IconButton,
  Center,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import random from "lodash/random";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { useState, useEffect, Fragment } from "react";
import CreateUserForm from "./CreateUserForm";
import CustomModal from "./CustomModal";
import { createUserFormId } from "./utils";
import { UserAdd } from "emotion-icons/heroicons-outline";
import UserCard from "./UserCard";
import { useFilterData } from "@/contexts/filterContext";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SeondaryButton";

const UserList = ({
  users,
  onReset,
}: {
  users: UserInterface[];
  onReset: () => void;
}) => {
  const { name, companyName, role, filteredUsers, onFilteredUsersChange } =
    useFilterData();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { showToast } = useCustomToast();

  const {
    isOpen: isCreateUserModalOpen,
    onOpen: onCreateUserModalOpen,
    onClose: onCreateUserModalClose,
  } = useDisclosure();

  const {
    isOpen: isUserDeleteModalOpen,
    onOpen: onUserDeleteModalOpen,
    onClose: onUserDeleteModalClose,
  } = useDisclosure();

  useEffect(() => {
    // NOTE: Need to change from api users data to local users data
    updateUserListByFiltering(users);
  }, [users, name, companyName, role]);

  const handleAddNewUser = (values: CreateUserInterface) => {
    const newUser: UserInterface = {
      id: users.length + random(1000, 5000),
      ...values,
    };
    onFilteredUsersChange([...filteredUsers, newUser]);
    updateUserListByFiltering([...filteredUsers, newUser]);
    onCreateUserModalClose();
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
        <PrimaryButton type="submit" form={createUserFormId}>
          Create
        </PrimaryButton>
        <SecondaryButton onClick={onCreateUserModalClose}>
          Close
        </SecondaryButton>
      </HStack>
    );
  };

  const updateUserListByFiltering = (userList: UserInterface[]) => {
    const updatedUsers = userList.filter((user) => {
      return (
        (isEmpty(name) ||
          user.username.toLowerCase().includes(name.toLowerCase())) &&
        (isEmpty(companyName) ||
          user.company.name
            .toLowerCase()
            .includes(companyName.toLowerCase())) &&
        (isNil(role) || user.role === role)
      );
    });
    onFilteredUsersChange(updatedUsers);
  };

  const handleDelete = () => {
    onFilteredUsersChange(
      filteredUsers.filter((user) => user.id !== selectedUserId)
    );
    handleDeleteUserModelClose();
    showToast({
      title: "User Deleted successfully",
      status: ToastStatusEnum.success,
      isClosable: true,
      duration: 3000,
    });
  };

  const handleDeleteUserModelClose = () => {
    setSelectedUserId(null);
    onUserDeleteModalClose();
  };

  const handleUserDeleteModalOpen = (userId: number) => {
    setSelectedUserId(userId);
    onUserDeleteModalOpen();
  };

  if (isEmpty(filteredUsers)) {
    return <UserNotFound onReset={onReset} />;
  }

  return (
    <>
      {/* --------- User Creating Model ------------ */}
      <CustomModal
        isOpen={isCreateUserModalOpen}
        onClose={onCreateUserModalClose}
        title="Create User"
        footer={getFormFooter()}
      >
        <CreateUserForm addUser={handleAddNewUser} />
      </CustomModal>
      {/* --------- User Delete Confirmation Model ------------ */}
      <CustomModal
        isOpen={isUserDeleteModalOpen}
        onClose={handleDeleteUserModelClose}
        title="Confirmation!!!"
        footer={
          <PrimaryButton
            bg="red.400"
            _hover={{
              bg: "red.500",
            }}
            color="white"
            onClick={handleDelete}
          >
            Delete
          </PrimaryButton>
        }
      >
        <Text
          fontFamily="Noto Serif"
          fontSize={["14px", null, "18px"]}
          fontWeight={500}
          lineHeight="1.25"
          pb={20}
        >
          Are you sure you want to delete this user?
        </Text>
      </CustomModal>
      <SimpleGrid
        templateColumns={["1fr", null, "1fr 1fr", null, null, "1fr 1fr 1fr"]}
        spacing={4}
        p={4}
        pb={20}
      >
        {filteredUsers.map((user) => (
          <Fragment key={user.id}>
            <UserCard
              userData={user}
              onDelete={() => handleUserDeleteModalOpen(user.id)}
            />
          </Fragment>
        ))}
      </SimpleGrid>
      <AddNewUser onClick={onCreateUserModalOpen} />
    </>
  );
};

const AddNewUser = ({ onClick }: { onClick: () => void }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <IconButton
      aria-label="Add User"
      bg="gray.200"
      borderRadius="full"
      icon={<UserAdd size={isMobile ? "20px" : "30px"} color="gray.600" />}
      onClick={onClick}
      w={isMobile ? "40px" : "50px"}
      h={isMobile ? "40px" : "50px"}
      position="fixed"
      bottom={5}
      right={[4, null, null, null, null, 8]}
      _hover={{
        bg: "gray.300",
      }}
    />
  );
};

const UserNotFound = ({ onReset }: { onReset: () => void }) => {
  return (
    <Center h="100%">
      <VStack spacing={4} p={6}>
        <Text fontFamily="Noto Serif" fontSize={["16px", null, "20px"]}>
          User not found
        </Text>
        <Button onClick={onReset}>Reset</Button>
      </VStack>
    </Center>
  );
};

export default UserList;
