import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { TModalController } from "../../Hooks/UseModal";
import { Fade } from "./Fade";
import { useStyles } from "./styles";

interface TModalComponentProps {
  closeable?: boolean;
  children: React.ReactElement | React.ReactElement[];
  controller: TModalController | TModalController<any>;
}

const ModalComponent = (props: TModalComponentProps) => {
  const classes = useStyles();
  const closeable = props.closeable ?? true;

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={props.controller.isOpen}
      onClose={closeable ? props.controller.close : undefined}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.controller.isOpen}>
        <div className={classes.paper}>{props.children}</div>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;
