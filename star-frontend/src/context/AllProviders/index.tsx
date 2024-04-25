import { Children, ReactElement } from "react";
import { MatrixProvider } from "../Matrix/MatrixContext";
import { OccupiedProvider } from "../Matrix/OccupiedContext";
import { TableInputProvider } from "../TableInput/TableInputContext";
import { VagasProvider } from "../TableValues/VagasContext";


interface AllProvidersProps {
    children: React.ReactNode;
  }
  
  export function AllProviders({ children }: AllProvidersProps): ReactElement {
    return (
      <VagasProvider>
        <MatrixProvider>
          <OccupiedProvider>
            <TableInputProvider>
              {children}
            </TableInputProvider>
          </OccupiedProvider>
        </MatrixProvider>
      </VagasProvider>
    );
  }
