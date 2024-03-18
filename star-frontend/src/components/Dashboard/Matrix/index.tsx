import { useState, useEffect } from "react";
import { Button, Flex, List, ListItem } from "@chakra-ui/react";
import { useMatrix } from "../../../context/Matrix/MatrixContext";
import { useOccupied } from "../../../context/Matrix/OccupiedContext";
import { LastOccupiedButton } from "./LastOccupiedButton";

export function Matrix() {
  const { sizeX, setSizeX, sizeY, setSizeY } = useMatrix();
  const [buttons, setButtons] = useState<JSX.Element[]>([]);
  const {occupied, setOccupied} = useOccupied();
  const [free, setFree] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    generateMatrix();
  }, [sizeX, sizeY, occupied, highlighted]);

  const handleButtonClick = (buttonLabel: string) => {
    if (occupied.includes(buttonLabel)) {
      setOccupied(occupied.filter((item) => item !== buttonLabel));
    } else {
      setOccupied([...occupied, buttonLabel]);
    }
  };
  
  const generateMatrix = () => {
    const matrixSizeX = Math.min(
      typeof sizeX === "number" ? sizeX : parseInt(sizeX)
    );
    const matrixSizeY = Math.min(
      typeof sizeY === "number" ? sizeY : parseInt(sizeY)
    );

    const newButtons: JSX.Element[] = [];
    const allItems: string[] = [];
    for (let i = 0; i < matrixSizeX; i++) {
      for (let j = 0; j < matrixSizeY; j++) {
        const buttonLabel = `${i + 1}${String.fromCharCode(65 + j)}`;
        allItems.push(buttonLabel);
        newButtons.push(
          <Button
            size="sm"
            key={buttonLabel}
            colorScheme={occupied.includes(buttonLabel) ? "red" : "gray"}
            onClick={() => handleButtonClick(buttonLabel)}
            w="40px"
            h="40px"
            m="1px"
          >
            {buttonLabel}
          </Button>
        );
      }
    }

    const freeItems = allItems.filter((item) => !occupied.includes(item));
    setFree(freeItems);
    setButtons(newButtons);
  };

  return (
    <>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Flex
          alignItems={"center"}
          flexDirection={"column"}
          maxW={550}
          maxH={460}
          mt={5}
          ml={"6"}
          backgroundColor={"gray.100"}
          p={4}
          borderRadius={"lg"}
          overflowY="auto"
        >
          <Flex wrap="wrap" justify="flex-end" align="center" maxW={"450"}>
            {buttons}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        mt="5"
        ml="6"
        flexDirection="column"
        maxH="450"
        overflowY="auto"
        backgroundColor={"gray.100"}
        p={5}
        borderRadius={"lg"} // Permite rolagem se o conteúdo ultrapassar o máximo de altura
      >
        <p>Ocupados:</p>
        <List>
          {occupied.map((item) => (
            <ListItem key={item} isTruncated>
              {" "}
              {/* Trunca texto se for muito longo */}
              {item}
            </ListItem>
          ))}
        </List>
        <p>Livres:</p>
        <List>
          {free.map((item) => (
            <ListItem key={item} isTruncated>
              {item}
            </ListItem>
          ))}
        </List>
      </Flex>
      {/* <HandleSubmit></HandleSubmit> */}
    </>
  );
}
