'use client';

import dynamic from 'next/dynamic';
import Header from "@/app/components/Header";

const Camera = dynamic(() => import('../components/Camera'), {ssr: false});

export default function Read() {
    return (
        <>
            <Header currentPage={2}/>
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Barcode Reader</h1>
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                    <Camera/>
                </div>
            </main>
        </>
    );
}
