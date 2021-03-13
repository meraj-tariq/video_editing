import { useState } from 'react';
/**
 *
 * @param initialMode The default state of the modal, true means the modal is open,
 * and false means it is closed by default
 */

export interface TModalController<T = never> {
  modalData: T;
  isOpen: boolean;
  open: (data?: T) => void;
  close: () => void;
  toggle: (data?: T) => void;
}

function useModal<T = never>(initialMode = false, initialData?: T): TModalController<T> {
  const [isOpen, setModalOpen] = useState(initialMode);
  const [modalData, setModalData] = useState<T>(initialData as T);

  /**
   * Toggle between show and hide
   */
  const toggle = (data?: T) => {
    if (data) setModalData(data);
    setModalOpen(!isOpen);
  };
  /**
   * Show the modal
   */
  const open = (data?: T) => {
    if (data) setModalData(data);
    setModalOpen(true);
  };
  /**
   * Hide the modal
   */
  const close = () => {
    setModalOpen(false);
  };

  return {
    modalData,
    isOpen,
    open,
    close,
    toggle,
  };
}

export default useModal;
