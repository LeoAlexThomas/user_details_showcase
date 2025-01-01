import { UseFormReturn } from "react-hook-form";
import { UserFilterForm } from "@/types/user";
import { useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { filterFormId, roleOptions } from "./utils";
import { VStack } from "@chakra-ui/react";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { useFilterData } from "@/contexts/filterContext";

const FilterForm = ({
  form,
  onFormSubmit,
}: {
  form: UseFormReturn<UserFilterForm>;
  onFormSubmit: () => void;
}) => {
  const {
    name,
    onNameChange,
    companyName,
    onCompanyNameChange,
    role,
    onRoleChange,
  } = useFilterData();

  useEffect(() => {
    form.reset({
      name: name,
      companyName: companyName,
      role: role,
    });
  }, [name, companyName, role]);

  const onSubmit = (values: UserFilterForm) => {
    if (!isNil(values.name) && !isEmpty(values.name.trim())) {
      onNameChange(values.name);
    }
    if (!isNil(values.companyName) && !isEmpty(values.companyName.trim())) {
      onCompanyNameChange(values.companyName);
    }
    onRoleChange(values.role);
    onFormSubmit();
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
