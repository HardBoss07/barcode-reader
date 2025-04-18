'use client';

import Image from 'next/image';
import Header from "@/app/components/Header";

export default function Home() {
    return (
        <>
            <Header currentPage={0}/>
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-8 text-center">Barcode Generator and Reader</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                    <a href="./generate"
                       className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                        <Image
                            src="/generator.png"
                            alt="Generator"
                            width={359}
                            height={317}
                            className="w-full h-auto object-cover"
                        />
                        <div className="p-4 text-center text-lg font-semibold">Generator</div>
                    </a>

                    <a href="./read"
                       className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                        <Image
                            src="/reader.png"
                            alt="Reader"
                            width={459}
                            height={317}
                            className="w-full h-auto object-cover"
                        />
                        <div className="p-4 text-center text-lg font-semibold">Reader</div>
                    </a>
                </div>
            </main>
        </>
    );
}
