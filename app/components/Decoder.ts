export function decode(barcode: string): string {
    if (!barcode || !validate(barcode)) {
        return "INVALID BARCODE";
    }

    return format(barcode);
}

function format(barcode: string): string {
    return `Formatted: ${barcode}`;
}

const validate = (barcode: string) => {
    const parts = barcode.split("-");

    if (parts.length !== 6) return false;

    for (let i = 0; i < 2; i++) {
        if (!/^[a-zA-Z]+$/.test(parts[i])) return false;
    }

    for (let i = 2; i < 6; i++) {
        if (!/^\d+$/.test(parts[i])) return false;
    }

    return true;
};