import { createPortal } from 'react-dom';
export default function Modal({ children, idDOM}) {
  return createPortal(children, document.getElementById(idDOM));
}

