'use client';

import dynamic from "next/dynamic";
import Head from "next/head";

const Camera = dynamic(() => import('./components/Camera'), { ssr: false });

export default function Home() {
  return (
    <>
      <h1>Barcode Generator and Reader</h1>
        <Camera />
    </>
  );
}
