'use client';

import {useEffect, useState} from 'react';
import Header from '@/app/components/Header';
import dynamic from 'next/dynamic';
import {decode} from "@/app/components/Decoder";

const Reader = dynamic(() => import('@/app/components/Reader'), {ssr: false});

export default function ReadPage() {
    const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
    const [decodedResult, setDecodedResult] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (scannedBarcode != null) {
            const result = decode(scannedBarcode);
            setDecodedResult(result);
            setIsValid(result !== "INVALID BARCODE");
        }
    }, [scannedBarcode]);

    return (
        <>
            <Header currentPage={2}/>
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Barcode Reader</h1>
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md flex flex-col items-center space-y-4">
                    <Reader onScan={setScannedBarcode}/>

                    {scannedBarcode && (
                        <div className="p-3 bg-green-100 text-green-800 rounded-lg w-full text-center">
                            <strong>Scanned Barcode:</strong> {scannedBarcode}
                        </div>
                    )}

                    {decodedResult && (
                        <div className={`p-3 rounded-lg w-full ${isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            <strong>{isValid ? "Decoded Result:" : "Invalid Barcode"}</strong>
                            <p className="whitespace-pre-line">{decodedResult}</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
