'use client';

import { useEffect, useState, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string | null>(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        let active = true;

        const getCameraStream = async () => {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: { facingMode: 'environment' },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;

                    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, e) => {
                        if (active && result) {
                            console.log(result);
                            setBarcode(result.getText());
                        }
                    });
                }
            } catch (e) {
                setError('Unable to access camera: ' + (e as Error).message);
            }
        };

        getCameraStream();

        return () => {
            active = false;
            codeReader.reset();

            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            {error && <p className="text-red-600">{error}</p>}
            <h1>Camera input:</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md h-auto border rounded"
            />
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
                <strong>Scanned Barcode:</strong> {barcode}
            </div>
        </div>
    );
}