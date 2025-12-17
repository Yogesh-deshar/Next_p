import React from "react";

export default function ProductDetailList({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <h2>this is is layout</h2>
    </>
  );
}
