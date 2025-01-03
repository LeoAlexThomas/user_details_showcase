import { RoleEnum, UserInterface } from "@/types/user";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextInterface {
  name: string;
  onNameChange: (val: string) => void;
  companyName: string;
  onCompanyNameChange: (val: string) => void;
  role: RoleEnum | null;
  onRoleChange: (val: RoleEnum | null) => void;
  resetValues: () => void;
  filteredUsers: UserInterface[];
  onFilteredUsersChange: (val: UserInterface[]) => void;
  getFilterCount: () => number | null;
}

const FilterDataContext = createContext<ContextInterface>({
  name: "",
  onNameChange: (val: string) => {},
  companyName: "",
  onCompanyNameChange: (val: string) => {},
  role: null,
  onRoleChange: (val: RoleEnum | null) => {},
  resetValues: () => {},
  filteredUsers: [],
  onFilteredUsersChange: (val: UserInterface[]) => {},
  getFilterCount: () => null,
});

export const FilterDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[]>([]);
  const [name, setName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [role, setRole] = useState<RoleEnum | null>(null);

  const getFilterCount = (): number | null => {
    let count = 0;
    if (!isEmpty(name)) {
      count++;
    }
    if (!isEmpty(companyName)) {
      count++;
    }
    if (!isNil(role)) {
      count++;
    }
    return count === 0 ? null : count;
  };

  useEffect(() => {
    updateUserListByFiltering();
  }, [name, companyName, role]);

  const updateUserListByFiltering = () => {
    const updatedUsers = filteredUsers.filter((user) => {
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
    setFilteredUsers(updatedUsers);
  };

  const resetValues = () => {
    setName("");
    setCompanyName("");
    setRole(null);
  };

  return (
    <FilterDataContext.Provider
      value={{
        name,
        onNameChange: setName,
        companyName,
        onCompanyNameChange: setCompanyName,
        role,
        onRoleChange: setRole,
        resetValues,
        filteredUsers,
        onFilteredUsersChange: setFilteredUsers,
        getFilterCount,
      }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};

export const useFilterData = () => useContext(FilterDataContext);
