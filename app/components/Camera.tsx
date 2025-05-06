'use client';

import React, { forwardRef } from 'react';

const Camera = forwardRef<HTMLVideoElement>((_, ref) => (
    <video
        ref={ref}
        autoPlay
        playsInline
        muted
        className="w-full max-w-md h-auto border border-gray-300 rounded-lg shadow-sm"
    />
));

Camera.displayName = 'Camera';

export default Camera;
