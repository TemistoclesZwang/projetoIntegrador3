import { PhoneIcon } from "@chakra-ui/icons";
import { IconButton, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

export function SearchPlate() {
    return (
        <InputLeftAddon>
            {/* <IconButton
                colorScheme="teal"
                aria-label="Call Segun"
                size="lg"
                icon={<PhoneIcon />}
            /> */}
            <InputGroup>
                <Input type='tel' placeholder='phone number1' />
            </InputGroup>
            <Input type='tel' placeholder='phone number' />
        </InputLeftAddon>
    );
}
