import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./modal.scss"

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div className={`modal ${active ? "active" : null}`} id={props.id}>{props.children}</div>
  );
};

Modal.prototype = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = (props) => {
    const contentRef = useRef(null)

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove("active")

        if (props.onClose) props.onClose()
    }

    return (
        <div ref={contentRef} className="modal_content">
            {props.children}
            <div className="close_modal" onClick={closeModal}>
                <i className="bx bx-x"></i>
            </div>
        </div>
    )
}

export default Modal
