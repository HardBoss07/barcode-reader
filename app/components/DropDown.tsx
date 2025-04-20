interface DropDownProps {
    label: string;
    chosenOption: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function DropDown({label, chosenOption, onChange}: DropDownProps) {
    const barcodeOptions: { [label: string]: string } = {
        "Code 128": "code128",
        "EAN-8": "ean8",
        "EAN-13": "ean13",
        "EAN-14": "ean14",
        "QR-Code": "qrcode",
        "Data Matrix": "datamatrix",
        "Aztec Code": "azteccode",
        "PDF 417": "pdf417",
        "Swiss QR-Code": "swissqrcode",
        "DotCode": "dotcode",
    };

    return (
        <div>
            <label className="text-sm font-medium text-gray-700">{label}</label>

            <select name={label} value={chosenOption} onChange={onChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {Object.entries(barcodeOptions).map(([label, value]) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
        </div>
    );
}