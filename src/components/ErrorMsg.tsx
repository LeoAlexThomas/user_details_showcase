import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ErrorWarning } from "@emotion-icons/remix-line/ErrorWarning";
const ErrorMsg = ({ text }: { text?: string }) => {
  return (
    <VStack>
      <ErrorWarning size="26px" color="red" />
      <Text color="red">{text ?? "Something went wrong"}</Text>
    </VStack>
  );
};

export default ErrorMsg;
