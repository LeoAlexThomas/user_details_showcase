import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton = (buttonProps: ButtonProps) => {
  return (
    <Button
      bg="blue.200"
      _hover={{
        bgColor: "blue.300",
      }}
      {...buttonProps}
    />
  );
};

export default PrimaryButton;
