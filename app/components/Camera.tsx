'use client';

import {useEffect, useState, useRef, use} from "react";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: { facingMode: 'environment' },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                }
            } catch (e) {
                setError('Unable to access camera: ' + (e as Error).message);
            }
        };

        getCameraStream();

        return () => {
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
            <video ref={videoRef} autoPlay playsInline className="w-70% h-auto" />
        </div>
    );
}