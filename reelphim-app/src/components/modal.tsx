import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import Backgrounds from '../assets/2.jpg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  saveButtonText?: string;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  saveButtonText = "Xác nhận",
  onSave,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-fadeIn" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-br from-green-300 to-red-300 p-6 shadow-lg focus:outline-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-2 text-gray-500 hover:bg-gray-200 focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div>{children}</div>

          {/* Footer */}
          <div className="mt-6 flex justify-end gap-4">
            <Dialog.Close asChild>
              <button
                className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
            </Dialog.Close>
            {onSave && (
              <button
              className="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
              onClick={onSave}
              >
                {saveButtonText}
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
