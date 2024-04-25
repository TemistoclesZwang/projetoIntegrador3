import { FormControl, FormLabel, Switch, Input, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMatrix } from "../../../../context/Matrix/MatrixContext";

export function DisableInput() {
  const [inputDisabled, setInputDisabled] = useState(false);
  const { sizeX, setSizeX, sizeY, setSizeY } = useMatrix();

  const handleSizeChange =
    (axis: "x" | "y") => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSize = event.target.value;
      if (newSize === "") {
        if (axis === "x") {
          setSizeX("");
        } else {
          setSizeY("");
        }
      } else {
        const numericSize = parseInt(newSize, 10);
        if (!isNaN(numericSize) && numericSize > 0) {
          if (axis === "x") {
            setSizeX(numericSize);
          } else {
            setSizeY(numericSize);
          }
        }
      }
    };
  return (
    <Flex flexDirection={'row'} alignItems={'center'}>
      <FormControl mb="4">
        <FormLabel htmlFor="input-disabled">
        <Text fontSize="sm">Desabilitar inputs</Text>

        </FormLabel>
        <Switch
          id="input-disabled"
          onChange={() => setInputDisabled(!inputDisabled)}
        />
      </FormControl>
      <Flex mb={'1.5rem'}>
      <Text fontSize="sm" >X</Text>
      <Input
        type="number"
        value={sizeX}
        onChange={handleSizeChange("x")}
        placeholder="Enter X-axis size"
        w={'3rem'}
        mr="2"
        isDisabled={inputDisabled}
        min={1}
      />
      <Text fontSize="sm">Y</Text>
      <Input
        type="number"
        value={sizeY}
        onChange={handleSizeChange("y")}
        placeholder="Enter Y-axis size"
        w="3rem"
        isDisabled={inputDisabled}
        min={1}
      />
</Flex>
    </Flex>
  );
}
