"use client";

import { FiUser } from "react-icons/fi";

interface props {
	dataSelected: any;
}
export const ViewUser = ({ dataSelected }: props) => {
	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
			<div className='w-full flex'>
				<FiUser size={24} className='mr-1' />
				<h3 className='text-xl font-semibold pb-2'>User</h3>
			</div>
			<table className='w-full'>
				<tr>
					<td className='p-1 border border-black bg-gray-200 w-[20%]'>
						Username
					</td>
					<td className='p-1 border border-black '>{dataSelected?.username}</td>
				</tr>
				<tr>
					<td className='p-1 border border-black bg-gray-200 w-[20%]'>Email</td>
					<td className='p-1 border border-black '>{dataSelected?.email}</td>
				</tr>
				<tr>
					<td className='p-1 border border-black bg-gray-200 w-[20%]'>Name</td>
					<td className='p-1 border border-black '>{dataSelected?.employee?.name}</td>
				</tr>
				<tr>
					<td className='p-1 border border-black bg-gray-200 w-[20%]'>
						Divisi
					</td>
					<td className='p-1 border border-black '>{dataSelected?.employee?.divisi}</td>
				</tr>
				<tr>
					<td className='p-1 border border-black bg-gray-200 w-[20%]'>
						Position
					</td>
					<td className='p-1 border border-black '>{dataSelected?.employee?.position}</td>
				</tr>
			</table>
		</div>
	);
};
