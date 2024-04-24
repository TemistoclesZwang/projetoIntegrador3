import { FormControl, FormLabel, Switch, Input, Flex } from "@chakra-ui/react";
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
    <Flex flexDirection={'row'} bgColor={'gray.100'}>
      <FormControl mb="4">
        <FormLabel htmlFor="input-disabled" mb="0">
          Disable Inputs
        </FormLabel>
        <Switch
          id="input-disabled"
          onChange={() => setInputDisabled(!inputDisabled)}
        />
      </FormControl>
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
  );
}
