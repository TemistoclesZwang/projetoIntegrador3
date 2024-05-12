// AutoUpdateToggle.tsx
import React from 'react';
import { Switch, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { useAutoUpdate } from '../../../context/AutoUpdateContext/AutoUpdateContext';

export function BtnAutoUpdateToggle() {
  const { isAutoUpdateEnabled, toggleAutoUpdate } = useAutoUpdate();

return (
    <Stack direction="row" justifyContent="end" mb={4}>
        <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-update-toggle" mb="0">
                Atualização automática:
            </FormLabel>
            <Switch
                id="auto-update-toggle"
                isChecked={isAutoUpdateEnabled}
                onChange={(event) => toggleAutoUpdate(event.target.checked)} // Pass the checked value as an argument
            />
        </FormControl>
    </Stack>
);
}