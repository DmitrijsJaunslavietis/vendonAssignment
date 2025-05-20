interface SelectProps
    extends React.DetailedHTMLProps<
        React.SelectHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
    > {
    label: string;
    options: Array<{ id: number; name: string }>;
}

export const Select = ({ label, options, ...props }: SelectProps) => {
    return (
        <div className="text-left">
            <label className="text-sm mb-2 block">{label}</label>
            <select
                {...props}
                className="border border-gray-300 rounded p-2 w-full"
            >
                <option selected value={undefined}>
                    {" "}
                    -- select a test --{" "}
                </option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
