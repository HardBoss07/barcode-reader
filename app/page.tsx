'use client';

import Header from "@/app/components/Header";
import {GeneratorIcon} from "@/app/components/GeneratorIcon";
import {ReaderIcon} from "@/app/components/ReaderIcon";

export default function Home() {
    return (
        <>
            <Header currentPage={0}/>
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-3xl font-bold mb-8 text-center">Barcode Generator and Reader</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                    <a href="./generate" className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                        <GeneratorIcon/>
                        <div className="p-4 text-center text-lg font-semibold">Generator</div>
                    </a>

                    <a href="./read" className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                        <ReaderIcon/>
                        <div className="p-4 text-center text-lg font-semibold">Reader</div>
                    </a>
                </div>
            </main>
        </>
    );
}
