"use client";
import { SnackbarProvider } from "notistack";

const NotistackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
};
export default NotistackProvider;
