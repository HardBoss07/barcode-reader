'use client';

import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import Camera from './Camera';

export default function Reader({
                                   onScan,
                               }: {
    onScan: (barcode: string) => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        let active = true;

        const getCameraStream = async () => {
            try {
                const constraints = {
                    audio: false,
                    video: {
                        facingMode: { ideal: 'environment' },
                        width: { min: 640, ideal: 1280, max: 1920 },
                        height: { min: 480, ideal: 720, max: 1080 },
                        frameRate: { ideal: 30 },
                    },
                };

                let videoStream;
                try {
                    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch {
                    videoStream = await navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: {
                            facingMode: 'environment',
                            width: { min: 320, ideal: 640 },
                            height: { min: 240, ideal: 480 },
                        },
                    });
                }

                setHasPermission(true);

                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;

                    codeReader.decodeFromVideoDevice(null, videoRef.current, (result) => {
                        if (active && result) {
                            onScan(result.getText());
                        }
                    });
                }
            } catch (e: any) {
                const message =
                    e.name === 'NotAllowedError'
                        ? 'Please allow camera access in your browser settings'
                        : e.name === 'NotFoundError' || e.name === 'OverconstrainedError'
                            ? 'No suitable camera found. Please try with a different device.'
                            : 'Failed to access camera: ' + e.message;

                setError(message);
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
    }, [onScan]);

    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            {!hasPermission && !error && (
                <div className="p-3 bg-blue-100 text-blue-800 rounded-lg text-center">
                    Please tap the screen to enable camera access
                </div>
            )}
            {error && <p className="text-red-600">{error}</p>}
            <Camera ref={videoRef} />
        </div>
    );
}
