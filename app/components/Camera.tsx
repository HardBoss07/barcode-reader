'use client';

import {useEffect, useState, useRef} from 'react';
import {BrowserMultiFormatReader} from '@zxing/library';

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string | null>(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        let active = true;

        const getCameraStream = async () => {
            try {
                console.log('Requesting camera access...');
                const constraints = {
                    audio: false,
                    video: {
                        facingMode: { ideal: 'environment' },
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }
                };

                const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('Camera stream obtained:', videoStream);

                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;

                    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                        if (active && result) {
                            console.log('Barcode detected:', result.getText());
                            setBarcode(result.getText());
                        }
                    });
                }
            } catch (e: any) {
                console.error('Camera access failed:', e.name, e.message);
                setError('Camera access failed: ' + e.name + ' – ' + e.message);
            }
        };

        getCameraStream();

        return () => {
            active = false;
            codeReader.reset();

            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <h2 className="text-lg font-medium mb-2">Camera Input</h2>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full max-w-md h-auto border border-gray-300 rounded-lg shadow-sm"
            />
            {barcode && (
                <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg w-full text-center">
                    <strong>Scanned Barcode:</strong> {barcode}
                </div>
            )}
        </div>
    );
}
