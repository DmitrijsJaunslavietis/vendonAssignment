interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string;
}

export const TextInput = ({ label, ...props }: TextInputProps) => {
    return (
        <div className="text-left">
            <label className="text-sm mb-2 block">{label}</label>
            <input
                {...props}
                className="border border-gray-300 rounded p-2 w-full"
            />
        </div>
    );
};
