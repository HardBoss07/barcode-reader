'use client';

import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

interface BarCodeProps {
    value: string;
}

export default function BarCode({ value }: BarCodeProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            JsBarcode(svgRef.current, value, {
                format: 'CODE128',
                displayValue: true,
                lineColor: '#000000',
                width: 2,
                height: 100,
                margin: 10,
            });
        }
    }, [value]);

    return <svg ref={svgRef}></svg>;
}