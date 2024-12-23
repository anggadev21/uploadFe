"use client"

import { FiUser } from "react-icons/fi";

interface props {
    dataSelected: any;
}
export const ViewEmployee = ({ dataSelected }: props) => {

	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
            <div className="w-full flex">
                <FiUser size={24} className="mr-1" />
                <h3 className="text-xl font-semibold pb-2">Employee</h3>
            </div>
			<table className="w-full">
                <tr>
                    <td className="p-1 border border-black bg-gray-200 w-[20%]">Name</td>
                    <td className="p-1 border border-black ">{dataSelected?.name}</td>
                </tr>
                <tr>
                    <td className="p-1 border border-black bg-gray-200 w-[20%]">NIK</td>
                    <td className="p-1 border border-black ">{dataSelected?.nik}</td>
                </tr>
                <tr>
                    <td className="p-1 border border-black bg-gray-200 w-[20%]">Divisi</td>
                    <td className="p-1 border border-black ">{dataSelected?.divisi}</td>
                </tr>
                <tr>
                    <td className="p-1 border border-black bg-gray-200 w-[20%]">Position</td>
                    <td className="p-1 border border-black ">{dataSelected?.position}</td>
                </tr>
            </table>
		</div>
	);
};
