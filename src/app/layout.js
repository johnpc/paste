import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "@/app/providers";
import Modal from "@/components/modal/Modal";
import Nav from "@/components/nav/Nav";
import classNames from "classnames";
import { Inter } from "next/font/google";
import ToastContainerLayout from "@/components/ToastContainerLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "paste.jpc.io",
  description:
    "A pastebin clone built with Next.js, AWS Amplify and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={classNames(inter.className, "bg-gray-100 dark:bg-zinc-900")}
      >
        <Providers>
          <Nav />
          {children}
          <Modal />
          <ToastContainerLayout />
        </Providers>
      </body>
    </html>
  );
}
