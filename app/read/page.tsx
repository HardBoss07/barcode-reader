'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import dynamic from 'next/dynamic';

const Reader = dynamic(() => import('@/app/components/Reader'), { ssr: false });

export default function ReadPage() {
    const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);


    return (
        <>
            <Header currentPage={2} />
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Barcode Reader</h1>
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col items-center space-y-4">
                    <Reader onScan={setScannedBarcode} />

                    {scannedBarcode && (
                        <div className="p-3 bg-green-100 text-green-800 rounded-lg w-full text-center">
                            <strong>Scanned Barcode:</strong> {scannedBarcode}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
