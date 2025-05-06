import {format} from "@/app/components/Formatter";

export function decode(barcode: string): string {
    if (!barcode || !validate(barcode)) {
        return "INVALID BARCODE";
    }

    return format(barcode);
}

const validate = (barcode: string): boolean => {
    if (barcode.length !== 24) return false;

    const parts = barcode.split("-");
    if (parts.length !== 6) return false;

    for (let i = 0; i < 2; i++) {
        if (!/^[A-Z]{2,4}$/.test(parts[i])) return false;
    }

    if (!/^\d{2}$/.test(parts[2])) return false;

    if (!/^\d{3}$/.test(parts[3])) return false;

    for (let i = 4; i <= 5; i++) {
        if (!/^\d{4}$/.test(parts[i])) return false;
        const month = parseInt(parts[i].slice(0, 2), 10);
        if (month < 1 || month > 12) return false;
    }

    return true;
};
