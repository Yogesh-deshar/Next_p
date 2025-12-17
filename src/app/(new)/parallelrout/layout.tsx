import React from "react";

export default function ParallellayoutLayout({
  children,
  firstfout,
  second,
}: Readonly<{
  children: React.ReactNode;
  firstfout: React.ReactNode;
  second: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <div className="text-red-400">{firstfout}</div>
        <div className="text-blue-400">{second}</div>
      </body>
    </html>
  );
}
