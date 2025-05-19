import clsx from "clsx";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: React.ReactNode;
    text?: string;
    variant?: "primary" | "secondary" | "danger" | "text";
}

export const Button = ({
    children,
    text,
    variant = "primary",
    ...rest
}: ButtonProps) => {
    const variants = {
        primary:
            "bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer",
        secondary:
            "bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer",
        danger: "bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-300 cursor-pointer",
        text: "cursor-pointer",
        disabled:
            "bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg",
    };

    return (
        <button
            {...rest}
            className={clsx(
                rest.disabled ? variants.disabled : variants[variant],
                rest.className
            )}
        >
            {children ?? text}
        </button>
    );
};
