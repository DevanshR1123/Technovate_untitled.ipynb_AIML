"use client";
import "react-toastify/dist/ReactToastify.css";

import { Slide, ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer transition={Slide} position="bottom-right" theme="dark" />
    </>
  );
}
