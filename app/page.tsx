"use client";

import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("./en/");
  }, []);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=./en/" />
        <title>Rushank | Portfolio</title>
      </head>
      <body className="bg-black text-white flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Redirecting to portfolio...</p>
      </body>
    </html>
  );
}