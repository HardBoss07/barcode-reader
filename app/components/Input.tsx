interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ label, value, onChange }: InputProps) {
    return (
        <div>
            <h2>{label}</h2>
            <input type="text" value={value} onChange={onChange} />
        </div>
    );
}
