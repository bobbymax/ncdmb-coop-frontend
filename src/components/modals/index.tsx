import React, { ReactNode } from "react";
import Button from "../forms/Button";

interface ModalHeaderProps {
  title: string;
  close: () => void;
}

interface ModalBodyProps {
  children?: ReactNode;
}

interface ModalProps extends ModalBodyProps {
  title: string;
  close: () => void;
  show: boolean;
  lg: boolean;
}

export interface ModalTypeProps extends ModalProps {
  submit: (value?: string | number | object) => void;
  isUpdating: boolean;
}

export const ModalHeader = ({ title, close }: ModalHeaderProps) => {
  return (
    <div className="custom__modal-header flex space-between align">
      <h3 className="custom__modal-title">{title}</h3>
      <Button
        icon="close"
        variant="danger"
        handleClick={close}
        size="sm"
        type="button"
        fontSize={13}
        place="left"
      />
    </div>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="custom__modal-body">
      <div className="modal__content">{children}</div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ title, close, show, lg, children }) => {
  const toggle = show ? "modal block" : "modal none";
  return (
    <div className={toggle}>
      <section className={`modal-main ${lg ? " large" : ""}`}>
        <ModalHeader title={title} close={close} />
        <ModalBody>{children}</ModalBody>
      </section>
    </div>
  );
};

export default Modal;
