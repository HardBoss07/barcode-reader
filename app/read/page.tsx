'use client';

import dynamic from "next/dynamic";

const Camera = dynamic(() => import('../components/Camera'), { ssr: false });

export default function Read() {
    return (
        <>
            <h1>Barcode Reader</h1>
            <Camera />
        </>
    );
}
