import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

const Panel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Flex
      bgColor="gray.100"
      w={{ base: "100%", md: "39rem" }}
      h={{ base: "47rem", md: "37rem" }}
      alignItems={"center"}
      borderRadius={"lg"}
      flexDirection={"column"}
    >
      <Text m="1rem">{title}</Text>
      {children}
    </Flex>
  );
};

export default Panel;
