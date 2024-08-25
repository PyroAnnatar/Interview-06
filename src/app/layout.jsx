import "./globals.css";
import { Mukta, Roboto_Slab } from "next/font/google";

const mukta_init = Mukta({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mukta",
});

const roboto_slab_init = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto-slab",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${mukta_init.variable} ${roboto_slab_init.variable} grid place-items-center h-screen bg-[url('/beautiful-mountains-landscape.jpg')] bg-cover bg-center`}
      >
        {children}
      </body>
    </html>
  );
}
