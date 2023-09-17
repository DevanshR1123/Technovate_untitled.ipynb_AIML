import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/components/contexts/Auth/AuthProvider";
import ToastProvider from "@/components/contexts/Toast/ToastProvider";
import { Suspense } from "react";
import "./globals.css";

export const metadata = {
  title: "Carpool Connect",
  description: "Technovate Carpool App",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grid min-h-[100dvh] grid-rows-layout-root bg-background text-white">
        <ToastProvider>
          <AuthProvider>
            <header>
              <Navbar />
            </header>
            <main className="grid">
              <Suspense fallback={<div className="h-16 w-16 animate-spin place-self-center rounded-full border-8 border-gray-300/20 border-t-green-600" />}>{children}</Suspense>
            </main>
            <footer className="p-4 text-center text-sm text-foreground">untitled.ipynb &copy; 2023</footer>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
