'use client';

import dynamic from "next/dynamic";

const Camera = dynamic(() => import('./components/Camera'), { ssr: false });

export default function Home() {
  return (
    <>
      <h1>Barcode Generator and Reader</h1>
        <a href="./generate">Generator</a>
        <a href="./read">Reader</a>
    </>
  );
}
