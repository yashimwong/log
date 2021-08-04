import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const element_ref = useRef(null);

  if (!element_ref.current) {
    element_ref.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(element_ref.current);
    return () => modalRoot.removeChild(element_ref.current);
  }, []);

  return createPortal(<div>{children}</div>, element_ref.current);
};

export default Modal;
