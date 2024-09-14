import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
  import { useRef } from "react";
  
  export function PaymentDialog({
    isOpen,
    onClose,
    onConfirm,
    isQrCodeVisible,
  }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (method: "dinheiro" | "pix") => void;
    isQrCodeVisible: boolean;
  }) {
    const cancelRef = useRef<HTMLButtonElement>(null);
  
    return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef} // Focus "Cancelar" for accessibility
        onClose={onClose} // Close the dialog when "Cancelar" is clicked
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Escolha o método de pagamento</AlertDialogHeader>
            <AlertDialogBody>
              {!isQrCodeVisible ? (
                <>
                  <Button onClick={() => onConfirm("dinheiro")}>Dinheiro</Button>
                  <Button onClick={() => onConfirm("pix")}>PIX</Button>
                </>
              ) : (
                <>
                  <h3>QR Code para pagamento via PIX:</h3>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PagamentoPix"
                    alt="QR Code"
                  />
                </>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {isQrCodeVisible ? "Fechar" : "Cancelar"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
  