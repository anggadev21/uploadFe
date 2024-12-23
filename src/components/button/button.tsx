import { ReactNode } from "react";

interface props {
	className?: string;
	type?: any;
	disabled?: boolean;
	children: ReactNode;
    onClick?: () => void;
}

export const Button = ({
	children,
	type,
	className,
	disabled,
    onClick
}: props) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`${className}`}
            onClick={onClick}
		>
			{children}
		</button>
	);
};
