"use client";

import { useEffect, useState } from "react";
import "../globals.css";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const [loading, setLoading] = useState(true);
  const { user, setLoading, loading } = useAuth();

  useEffect(() => {
    if (user?.id) {
      setLoading(false);
    }
  }, [user]);

  return (
    <section>
      <AuthProvider>        
          <div suppressHydrationWarning={true}>
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
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              
                <div className="flex h-screen overflow-hidden">
                  {/* <!-- ===== Sidebar Start ===== --> */}

                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Sidebar End ===== --> */}

                  {/* <!-- ===== Content Area Start ===== --> */}
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    
                    <Header
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />

                    
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                      </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                  </div>
                  {/* <!-- ===== Content Area End ===== --> */}
                </div>
              
            </div>
          </div>                  
        
      </AuthProvider>
    </section>
  );
}
