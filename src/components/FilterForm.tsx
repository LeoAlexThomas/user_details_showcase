import { useForm, UseFormReturn } from "react-hook-form";
import { RoleEnum, UserFilterForm } from "../types/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isEmpty, isNil, isString } from "lodash";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";
import { filterFormId, getUserRole, roleOptions } from "./utils";
import { Button, HStack, VStack } from "@chakra-ui/react";
import InputField from "./form/InputField";
import SelectField from "./form/SelectField";

const FilterForm = ({ form }: { form: UseFormReturn<UserFilterForm> }) => {
  const router = useRouter();
  const path = router.asPath;
  const name = router.query.name;
  const companyName = router.query.companyName;
  const role = router.query.role;

  useEffect(() => {
    form.reset({
      name: !isNil(name) && isString(name) && isEmpty(name.trim()) ? name : "",
      companyName:
        !isNil(companyName) &&
        isString(companyName) &&
        isEmpty(companyName.trim())
          ? companyName
          : "",
      role: !isNil(role) && isString(role) ? getUserRole(role) : null,
    });
  }, [name, companyName, role]);

  const onSubmit = (values: UserFilterForm) => {
    router.push(
      `/?name=${values.name}&companyName=${values.companyName}&role=${
        values.role ?? ""
      }`
    );
  };

  return (
    <form
      id={filterFormId}
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack alignItems="stretch" spacing={4}>
        <InputField
          hForm={form}
          name="name"
          title="Name"
          placeholder="Enter a user name"
        />
        <InputField
          hForm={form}
          name="companyName"
          title="Company Name"
          placeholder="Enter a company name"
        />
        <SelectField
          hForm={form}
          name="role"
          title="User Role"
          placeholder="Select a user role"
          options={roleOptions}
        />
      </VStack>
    </form>
  );
};

export default FilterForm;
