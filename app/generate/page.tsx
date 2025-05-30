'use client';

import Barcode from '@/app/components/Barcode';
import {useRef, useState} from 'react';
import Input from '@/app/components/Input';
import Header from "@/app/components/Header";
import DropDown from "@/app/components/DropDown";

export default function Generate() {
    const [value, setValue] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [chosenOption, setChosenOption] = useState<string>('');

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChosenOption(e.target.value);
    }

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas || !value) return;

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `barcode-${value}.png`;
        link.click();
    };

    return (
        <>
            <Header currentPage={1}/>
            <main className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center">Generate Your Barcode</h1>

                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-6">
                    <DropDown label="Select Type of Code" chosenOption={chosenOption} onChange={handleDropDownChange}/>
                    <Input
                        label="Enter Barcode"
                        value={value}
                        onChange={handleValueChange}
                        placeholder="1234567890"
                    />

                    {value && (
                        <div className="flex justify-center">
                            <div className="w-full max-w-full h-auto overflow-hidden">
                                <Barcode
                                    chosenOption={chosenOption}
                                    value={value}
                                    onRendered={(canvas) => (canvasRef.current = canvas)}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleDownload}
                        disabled={!value}
                        className={`w-full py-2 px-4 font-semibold rounded-lg transition ${
                            value
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                    >
                        Download Barcode
                    </button>
                </div>
            </main>
        </>
    );
}