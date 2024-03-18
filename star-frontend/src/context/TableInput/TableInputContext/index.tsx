// TableInputContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { LastOccupiedButton } from "../../../components/Dashboard/Matrix/LastOccupiedButton";

interface ITableInputContext {
  name: string;
  plate: string;
  durationHours: number;
  durationMinutes: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPlate: React.Dispatch<React.SetStateAction<string>>;
  setDurationHours: React.Dispatch<React.SetStateAction<number>>;
  setDurationMinutes: React.Dispatch<React.SetStateAction<number>>;
  handleSubmitTableInputContext: () => void;
}

export const TableInputContext = createContext<ITableInputContext>({
  name: "",
  plate: "",
  durationHours: 0,
  durationMinutes: 0,
  setName: () => {},
  setPlate: () => {},
  setDurationHours: () => {},
  setDurationMinutes: () => {},
  handleSubmitTableInputContext: () => {},
});

export const useTableInput = () => useContext(TableInputContext);

interface TableInputProviderProps {
  children: ReactNode;
}

export const TableInputProvider: React.FC<TableInputProviderProps> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);

  const handleSubmitTableInputContext = () => {
    console.log("Nome:", name);
    console.log("Placa:", plate);
    console.log(
      "Duração:",
      durationHours + " horas e " + durationMinutes + " minutos"
    );
  };

  return (
    <TableInputContext.Provider
      value={{
        name,
        plate,
        durationHours,
        durationMinutes,
        setName,
        setPlate,
        setDurationHours,
        setDurationMinutes,
        handleSubmitTableInputContext,
      }}
    >
      {children}
    </TableInputContext.Provider>
  );
};
