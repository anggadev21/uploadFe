"use client"

import { useEffect, useState } from "react";
import { Header } from "@/components";

export const DashboardPage = () => {
	const [totalCustomer, setTotalCustomer] = useState<number>(0);
	const [totalEmploye, setTotalEmploye] = useState<number>(0);
	const [totalSupplier, setTotalSupplier] = useState<number>(0);

	// useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className='h-screen w-screen'>
			<Header />
			<div className='mt-14 lg:mt-20 md:mt-20 sm:mt-20'>
				<div className='flex items-center mt-5 gap-5 lg:flex-row flex-col'>
					{/* {DataOverview.map((value: any, i:number) => {
						return (
							<div
								className='flex border rounded-xl shadow-md py-4 px-5 w-full justify-between'
								key={i}
							>
								<div>
									<h4 className='text-base font-semibold text-gray-500'>
										{value.name}
									</h4>
									<h2 className='mt-3 text-3xl font-semibold text-gray-600'>
										{ value.id === 'customer' ? totalCustomer : value.id === 'employe' ? totalEmploye : totalSupplier }
									</h2>
								</div>
								<div
									className='bg-red-500 p-2 flex justify-center items-center'
									style={{ width: "62px", height: "60px", borderRadius: 23 }}
								>
									{value.icon}
								</div>
							</div>
						);
					})} */}
				</div>
			</div>
		</div>
	);
};
