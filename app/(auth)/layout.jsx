"use client";

import Image from "next/image";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <main>
      <AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div>
          <div className="flex flex-col items-center justify-center bg-black pt-20 px-5">
            <Image
              src="./assets/Pelegrin_Design.svg"
              alt="Pelegrin Design"
              className="w-[150px] h-[41px] object-contain"
              width={200}
              height={200}
              priority={true} 
            />
            <div className="rounded-full bg-white p-6 mt-10 -mb-16 shadow-md z-10">
              <Image
                className="w-28 h-28 object-contain"
                src="./assets/Logo.svg"
                alt="Pelegrin Design"
                width={200}
                height={200}
                priority={true} 
              />
            </div>
          </div>
          <svg
            className="-mt-12"
            width="100%"
            height="100"
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L0,40 Q250,90 500,40 L500,0 Z" fill="black" />
          </svg>
          {children}
        </div>
      </AuthProvider>
    </main>
  );
}
