"use client";

import Barcode from '../components/Barcode';
import {useState} from "react";
import Input from "@/app/components/Input";

export default function Generate() {
    const [value, setValue] = useState<string>("Enter your Barcode");

    const handeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <h1>1D Barcode Example</h1>
            <Input label="Enter Barcode" value={value} onChange={handeValueChange} />
            <Barcode value={value} />
        </div>
    );
}
