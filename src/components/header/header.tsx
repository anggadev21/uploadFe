"use client";

import {
	FiHome,
	FiFile,
	FiServer,
	FiUsers,
	FiUser,
	FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { DropdownUser } from "./menu";
import { getRole } from "@/util";

export const Header = () => {
	const router = useRouter();
	const role = getRole();

	return (
		<div className='p-2 bg-cyan-400'>
			<div className='flex justify-between items-center'>
				<div className='flex items-start cursor-pointer'>
					<FiServer size={18} className='my-auto mr-1 font-semibold' />
					<h3 className='text-xl font-semibold'>Driveweb</h3>
				</div>
				<div className='flex items-end space-x-2'>
					{role === "Admin" ? (
						<>
							<div
								className='flex hover:bg-cyan-200 hover:scale-105 rounded-lg px-3 cursor-pointer'
								onClick={() => router.push("/")}
							>
								<FiHome size={18} className='my-auto mr-1' />
								<span className='text-md font-semibold'>Dashboard</span>
							</div>
							<div
								className='flex hover:bg-cyan-200 hover:scale-105 rounded-lg px-3 cursor-pointer'
								onClick={() => router.push("/employee")}
							>
								<FiUsers size={18} className='my-auto mr-1' />
								<span className='text-md font-semibold'>Employee</span>
							</div>
							<div
								className='flex hover:bg-cyan-200 hover:scale-105 rounded-lg px-3 cursor-pointer'
								onClick={() => router.push("/user")}
							>
								<FiUsers size={18} className='my-auto mr-1' />
								<span className='text-md font-semibold'>User</span>
							</div>
							<div
								className='flex hover:bg-cyan-200 hover:scale-105 rounded-lg px-3 cursor-pointer'
								onClick={() => router.push("/file")}
							>
								<FiFile size={18} className='my-auto mr-1' />
								<span className='text-md font-semibold'>File</span>
							</div>
						</>
					) : null}
					<div className='flex hover:bg-cyan-200 hover:scale-105 rounded-lg px-3 cursor-pointer'>
						<DropdownUser />
					</div>
				</div>
			</div>
		</div>
	);
};
