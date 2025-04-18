'use client';

import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

interface BarCodeProps {
    value: string;
    onRendered?: (canvas: HTMLCanvasElement) => void;
}

export default function BarCode({ value, onRendered }: BarCodeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            JsBarcode(canvasRef.current, value, {
                format: 'CODE128',
                displayValue: true,
                lineColor: '#000000',
                width: 2,
                height: 100,
                margin: 10,
            });

            if (onRendered) {
                onRendered(canvasRef.current);
            }
        }
    }, [value, onRendered]);

    return <canvas ref={canvasRef}></canvas>;
}