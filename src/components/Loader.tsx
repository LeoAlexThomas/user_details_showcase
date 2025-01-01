import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center h="90vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default Loader;
