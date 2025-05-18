interface AnswerButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected: boolean;
    children?: React.ReactNode;
    text?: string;
    disabled?: boolean;
}

export const AnswerButton = ({
    selected,
    children,
    text,
    disabled,
    ...props
}: AnswerButtonProps) => {
    return (
        <button
            {...props}
            className={`border border-gray-300 rounded p-2 w-full mb-2 cursor-pointer transition-shadow duration-300 hover:shadow-lg ${
                selected ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
            disabled={disabled}
        >
            {children ?? text}
        </button>
    );
};
