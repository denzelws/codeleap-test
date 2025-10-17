import React, { type ReactNode } from 'react'
import './index.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  children,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
