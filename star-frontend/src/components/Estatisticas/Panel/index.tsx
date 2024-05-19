import {
  Flex,
  Text,
} from "@chakra-ui/react";

const Panel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex
      bgColor="gray.100"
      w="100%"
      borderRadius={"lg"}
      flexDirection={"column"}
      p="1rem"
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        h={'auto'}
        w={'100%'}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Panel;
