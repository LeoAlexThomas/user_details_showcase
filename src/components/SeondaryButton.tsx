import { Button, ButtonProps } from "@chakra-ui/react";

const SecondaryButton = (buttonProps: ButtonProps) => {
  return <Button variant="outline" borderColor="blue.200" {...buttonProps} />;
};

export default SecondaryButton;
