import { FiSearch } from "react-icons/fi";

interface props {
    search: string;
    onChange: (e: any) => void;
}

export const Search = ({ search, onChange }: props) => {
	return (
		<div className='relative w-full'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500 z-0'>
				<FiSearch size={24} />
			</div>
			<input
				type='text'
				className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pl-11 outline-blue-600'
				placeholder={ search }
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
};
