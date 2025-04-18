"use client";

import Barcode from '../components/Barcode';
import {useRef, useState} from "react";
import Input from "@/app/components/Input";

export default function Generate() {
    const [value, setValue] = useState<string>("Enter your Barcode");
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `barcode-${value}.png`;
        link.click();
    };
    return (
        <div>
            <Input label="Enter Barcode" value={value} onChange={handleValueChange} />
            <Barcode value={value} onRendered={canvas => (canvasRef.current = canvas)} />
            <button onClick={handleDownload}>Download Barcode</button>
        </div>
    );
}
