'use client';

import {useEffect, useState, useRef} from 'react';
import {BrowserMultiFormatReader} from '@zxing/library';

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [barcode, setBarcode] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        let active = true;

        const getCameraStream = async () => {
            try {
                console.log('Requesting camera access...');

                const constraints = {
                    audio: false,
                    video: {
                        facingMode: {ideal: 'environment'},
                        width: {min: 640, ideal: 1280, max: 1920},
                        height: {min: 480, ideal: 720, max: 1080},
                        frameRate: {ideal: 30}
                    }
                };

                let videoStream;
                try {
                    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch (idealError) {
                    console.log('Ideal constraints failed, trying more relaxed constraints');
                    videoStream = await navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            facingMode: 'environment',
                            width: {min: 320, ideal: 640},
                            height: {min: 240, ideal: 480}
                        }
                    });
                }

                console.log('Camera stream obtained:', videoStream);
                setHasPermission(true);

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
                setError(`Camera access failed: ${e.name} – ${e.message}`);

                if (e.name === 'NotAllowedError') {
                    setError('Please allow camera access in your browser settings');
                } else if (e.name === 'NotFoundError' || e.name === 'OverconstrainedError') {
                    setError('No suitable camera found. Please try with a different device.');
                } else {
                    setError('Failed to access camera: ' + e.message);
                }
            }
        };

        const handleUserInteraction = () => {
            getCameraStream();
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };

        window.addEventListener('click', handleUserInteraction);
        window.addEventListener('touchstart', handleUserInteraction);

        return () => {
            active = false;
            codeReader.reset();

            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((track) => track.stop());
            }

            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            {!hasPermission && !error && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg">
                    <p>Please tap the screen to enable camera access</p>
                </div>
            )}

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <h2 className="text-lg font-medium mb-2">Camera Input</h2>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
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