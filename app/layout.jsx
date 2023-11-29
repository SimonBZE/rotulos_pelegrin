"use client";

import Image from "next/image";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <NextUIProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
