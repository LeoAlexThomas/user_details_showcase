import { Box, Grid, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { createUserFormId, roleOptions } from "./utils";
import { useForm } from "react-hook-form";
import InputField from "./form/InputField";
import { CreateUserInterface, RoleEnum, UserInterface } from "@/types/user";
import SelectField from "./form/SelectField";

const CreateUserForm = ({
  addUser,
}: {
  addUser: (val: CreateUserInterface) => void;
}) => {
  const userForm = useForm<CreateUserInterface>({
    mode: "onChange",
    defaultValues: {
      username: "",
      company: {
        department: "",
        name: "",
        title: "",
      },
      email: "",
      role: RoleEnum.user,
    },
  });

  return (
    <form
      id={createUserFormId}
      onSubmit={userForm.handleSubmit(addUser)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch">
        <InputField
          hForm={userForm}
          name="username"
          placeholder="Enter user name"
          title="Name"
          rules={{ required: true }}
        />
        <InputField
          hForm={userForm}
          name="email"
          placeholder="Enter user email"
          title="Email"
          type="email"
          rules={{ required: true }}
        />
        <SelectField
          hForm={userForm}
          name="role"
          placeholder="Select user role"
          title="Role"
          rules={{ required: true }}
          options={roleOptions}
          isDisabled
        />

        <VStack
          spacing={2}
          alignItems="stretch"
          border="1px solid #00000050"
          borderRadius="8px"
          p={4}
          mt={2}
        >
          <Text
            fontFamily="Playfair Display"
            fontSize={["16px", null, "18px"]}
            fontWeight={700}
          >
            Company Details
          </Text>
          <VStack alignItems="stretch">
            <InputField
              hForm={userForm}
              name="company.name"
              title="Name"
              rules={{ required: true }}
              placeholder="Enter company name"
            />
            <InputField
              hForm={userForm}
              name="company.department"
              title="Department"
              rules={{ required: true }}
              placeholder="Enter department name"
            />
            <InputField
              hForm={userForm}
              name="company.title"
              title="Job title"
              rules={{ required: true }}
              placeholder="Enter job title"
            />
          </VStack>
        </VStack>
      </VStack>
    </form>
  );
};

export default CreateUserForm;
