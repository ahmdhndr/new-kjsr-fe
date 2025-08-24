import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  open: (key: string) => void;
  close: () => void;
  modalKey: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState<string | null>(null);

  const open = (key: string) => {
    setModalKey(key);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setModalKey(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalKey, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
