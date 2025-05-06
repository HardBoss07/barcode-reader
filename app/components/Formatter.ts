const formatParts: string[] = [
    "City Code: ",
    "Parkhaus-Code: ",
    "Parkdeck: ",
    "Parkplatz: ",
    "Mietstart: ",
    "Mietende: ",
];

export const cityCodes: Record<string, string> = {
    WINT: "Winterthur",
    ZURH: "Zürich",
    BRLN: "Berlin",
    WIEN: "Wien",
};

export const parkCodes: Record<string, string> = {
    HB: "Hauptbahnhof",
    NO: "Nord",
    EA: "Ost",
    SO: "Süd",
    WE: "West",
    RB: "Rosenberg",
    NW: "Neuwiesen",
    TK: "Technikum",
};

function formatMonthYear(dateStr: string): string {
    if (!/^\d{4}$/.test(dateStr)) {
        throw new Error("Input must be a 4-digit string (MMYY)");
    }

    const month = parseInt(dateStr.slice(0, 2), 10);
    const year = 2000 + parseInt(dateStr.slice(2, 4), 10);

    const monthNames = [
        "", "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    if (month < 1 || month > 12) {
        throw new Error("Invalid month in string");
    }

    return `${monthNames[month]} ${year}`;
}

export function format(barcode: string): string {
    const split = barcode.split("-");
    let formatted = "";

    split.forEach((part, i) => {
        let line = formatParts[i] ?? `Part ${i + 1}: `;

        if (i === 0 && cityCodes[part]) {
            line += `${part} (${cityCodes[part]})`;
        } else if (i === 1 && parkCodes[part]) {
            line += `${part} (${parkCodes[part]})`;
        } else if (i === 4 || i === 5) {
            line += formatMonthYear(part);
        } else {
            line += part;
        }

        formatted += line + "\n";
    });

    return formatted.trim();
}