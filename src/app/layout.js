"use client";
import { ReduxProvider } from "@/redux/provider";
import "./globals.css";
import "../i18n";

export const metadata = {
  title: "Smarty Cards",
  description: "Your old reliable notes, but smarter.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <div id="modal-root"></div>
        <ReduxProvider>{children}</ReduxProvider>
        <div id="snackbar__root"></div>
      </body>
    </html>
  );
}
