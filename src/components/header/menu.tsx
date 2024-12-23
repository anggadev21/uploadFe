import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { FiUser } from "react-icons/fi";
import { getName, removeToken } from "@/util";
import { Logout } from "@/service";

export const DropdownUser = () => {
	const router = useRouter();
	const [name, setName] = useState<any>();

	useEffect(() => {
		let name = getName();
		if (name) {
			setName(name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = async () => {
		await Logout();
		removeToken();
		router.push("/");
	};

	return (
		<Menu as='div' className='relative inline-block text-left'>
			<MenuButton className='flex'>
				<FiUser size={18} className='my-auto mr-1' />
				<span className='text-md font-semibold'>{name}</span>
			</MenuButton>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<MenuItem>
						<Link href={"/"}>
							<span className='bg-white text-gray-900 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'>
								Account
							</span>
						</Link>
					</MenuItem>
					<Menu.Item>
						<span
							className='bg-white text-gray-900 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200'
							onClick={() => logout()}
						>
							Sign out
						</span>
					</Menu.Item>
				</MenuItems>
			</Transition>
		</Menu>
	);
};
