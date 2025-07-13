import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import ReduxProvider from "@/store/ReduxProvider";
// import Footer from "@/components/layout/Footer";
import {ToastContainer} from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Application",
  description: "Blog Application Project",
  authors: [{name: "Muhammet Eren Yılmaz", url: "https://quarkend.com"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} >
        <ReduxProvider>
          <Header/>
            <div className="mx-auto px-4 max-w-screen-xl flex-1">
              {children}
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          {/* <Footer/> */}
        </ReduxProvider>
      </body>
    </html>
  );
}
