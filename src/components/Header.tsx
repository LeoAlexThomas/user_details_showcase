import { HStack, Text, IconButton, Box, Center } from "@chakra-ui/react";
import { Filter } from "@emotion-icons/fa-solid/Filter";
import { Refresh } from "@emotion-icons/evaicons-solid/Refresh";
import { useFilterData } from "@/contexts/filterContext";

const Header = ({
  onFilterPressed,
  onRefreshPressed,
}: {
  onFilterPressed: () => void;
  onRefreshPressed: () => void;
}) => {
  const { getFilterCount } = useFilterData();
  return (
    <HStack
      h="70px"
      w="100%"
      bg="gray.300"
      p={4}
      justifyContent="space-between"
    >
      <Text
        fontFamily="Playfair Display"
        fontSize={["24px", null, "32px"]}
        fontWeight={700}
        lineHeight="1.25"
      >
        User Details
      </Text>
      <HStack spacing={4}>
        <Box pos="relative">
          <IconButton
            aria-label="Filter"
            icon={<Filter size={"20px"} />}
            onClick={onFilterPressed}
          />
          <Center
            bg="red"
            borderRadius="full"
            fontFamily="Noto Serif"
            fontSize={["10px", null, "12px"]}
            fontWeight={800}
            pos="absolute"
            top={-1}
            right={-1}
            color="white"
            w="16px"
            h="16px"
            textAlign="center"
            verticalAlign="center"
          >
            {getFilterCount() ?? 0}
          </Center>
        </Box>
        <IconButton
          aria-label="refresh"
          icon={<Refresh size={"20px"} />}
          onClick={onRefreshPressed}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
