import Select from 'react-select';

interface props {
	id?: string;
	className?: string;
	type?: string;
	placeholder?: string;
	label?: string;
	menuPlacement?: any;
	value?: any;
	name?: string;
	required?: boolean;
	withLabel?: boolean;
	isMulti?: boolean;
	onChange?: any;
	datas?: any;
}

export const Dropdown = ({
	id,
	placeholder,
	label,
	value,
	name,
	className,
	menuPlacement,
	required,
	withLabel,
	isMulti,
	onChange,
	datas,
}: props) => {
	return (
		<div className='w-full'>
			{withLabel ? (
				<label
					htmlFor={id}
					className='block mb-2 text-sm font-medium text-gray-900'
				>
					{label}
				</label>
			) : null}
			<Select
				// disabled={disabled}
				menuPlacement={menuPlacement}
				name={name}
				isMulti={isMulti}
				// id={id}
				placeholder={placeholder}
				value={value}
				className={`${className}`}
				required={required}
				onChange={onChange}
				options={datas}
				maxMenuHeight={150}
			/>
		</div>
	);
};
