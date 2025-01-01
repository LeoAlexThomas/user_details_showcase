import { filterFormId } from "@/components/utils";
import WithLoader from "@/components/WithLoader";
import {
  PaginationInterface,
  UserFilterForm,
  UserInterface,
} from "@/types/user";
import { Button, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import Head from "next/head";
import CustomModal from "@/components/CustomModal";
import FilterForm from "@/components/FilterForm";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import UserList from "@/components/UserList";
import { useFilterData } from "@/contexts/filterContext";
import useSWR, { mutate } from "swr";
import isNil from "lodash/isNil";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import ErrorMsg from "@/components/ErrorMsg";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SeondaryButton";

const HomePage = () => {
  const { resetValues, onFilteredUsersChange } = useFilterData();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data, error } = useSWR<PaginationInterface<UserInterface>>("/users");
  const isUserLoading = !data && !error;
  const userFilterForm = useForm<UserFilterForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      companyName: "",
      role: null,
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    onFilteredUsersChange(data.users);
  }, [data]);

  const handleFormReset = () => {
    mutate<PaginationInterface<UserInterface>>("/users").then((val) => {
      if (isNil(val)) {
        return;
      }
      onFilteredUsersChange(val.users);
    });
    userFilterForm.reset();
    resetValues();
  };

  const handleRefresh = () => {
    mutate<PaginationInterface<UserInterface>>("/users").then((val) => {
      if (isNil(val)) {
        return;
      }
      onFilteredUsersChange(val.users);
    });
    userFilterForm.reset();
    resetValues();
  };

  const getFormFooter = () => {
    return (
      <HStack w="100%" justifyContent="space-between">
        <Button
          variant="ghost"
          bg="blue.50"
          _hover={{
            bg: "blue.100",
          }}
          onClick={() => {
            handleFormReset();
            onClose();
          }}
        >
          Reset
        </Button>
        <HStack>
          <PrimaryButton type="submit" form={filterFormId}>
            Filter
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
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
        w="100%"
        backgroundColor="gray.300"
        spacing={4}
        alignItems="stretch"
        h="100vh"
        overflowY="auto"
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
          <FilterForm form={userFilterForm} onFormSubmit={onClose} />
        </CustomModal>
        <Header onFilterPressed={onOpen} onRefreshPressed={handleRefresh} />

        {isUserLoading ? (
          <Loader />
        ) : !isNil(error) ? (
          <ErrorMsg />
        ) : (
          <UserList users={data?.users ?? []} onReset={handleFormReset} />
        )}
      </VStack>
    </>
  );
};

export default HomePage;
