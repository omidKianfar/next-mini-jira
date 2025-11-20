export type ModalProps = React.PropsWithChildren & {
  open: boolean;
  handleClose: () => void;
};
