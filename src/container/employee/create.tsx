"use client";

import { Form, Formik } from "formik";
import { employeeSchema } from "@/schema";
import { iEmployee } from "@/interface";
import { useState } from "react";
import { Button, Input } from "@/components";
import { FiPlus, FiX } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { CreateEmployee } from "@/service";
import { ToastNotif } from "@/util";

interface props {
	content: string;
	showModal: (val: boolean, content: string, reload: boolean) => void;
}
export const AddEmployee = ({ content, showModal }: props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data] = useState<iEmployee>({
		name: "",
		nik: "",
		divisi: "",
		position: "",
	});

	const createEmployee = async (payload: any) => {
		setIsLoading(true);
		try {
			const response = await CreateEmployee(payload);
			if (response.data.statusCode === 200) {
				showModal(false, "add", true);
				ToastNotif("success", "Add employee Success");
			} else {
				ToastNotif("error", response.data.error.message);
			}
		} catch (error) {
			ToastNotif("error", "Add employee Failed");
		}
		setIsLoading(false);
	};

	return (
		<div className='px-5 pb-2 mt-4 overflow-auto'>
			<Formik
				initialValues={data}
				validationSchema={employeeSchema}
				onSubmit={(values) => {
					createEmployee(values);
				}}
			>
				{({
					handleChange,
					handleSubmit,
					setFieldValue,
					errors,
					touched,
					values,
				}) => (
					<Form>
						<div className='grid grid-cols-2 gap-2'>
							<div className='w-full'>
								<Input
									id='name'
									name='name'
									placeholder='Name'
									label='Name'
									type='text'
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
								{errors.name && touched.name ? (
									<span className='text-red-500 text-xs'>{errors.name}</span>
								) : null}
							</div>
							<div className='w-full'>
								<Input
									id='nik'
									name='nik'
									placeholder='NIK'
									label='NIK'
									type='text'
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
							</div>
							<div className='w-full'>
								<Input
									id='divisi'
									name='divisi'
									placeholder='Divisi'
									label='Divisi'
									type='text'
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
							</div>
							<div className='w-full'>
								<Input
									id='position'
									name='position'
									placeholder='Position'
									label='Position'
									type='text'
									onChange={handleChange}
									withLabel={true}
									className='bg-white border border-blue-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 outline-blue-600'
								/>
							</div>
						</div>
						<div className='mt-8 flex justify-end space-x-2'>
							<Button
								type='button'
								className='flex bg-red-500 hover:bg-red-700 hover:scale-105 text-white rounded-md p-2'
								onClick={() => {
									showModal(false, content, false);
								}}
								disabled={isLoading}
							>
								<p className='flex mx-auto'>
									<FiX color='white' size={22} className='py-auto mr-2' />
									Cancel
								</p>
							</Button>
							<Button
								type='button'
								className='flex bg-green-500 hover:bg-green-700 hover:scale-105 text-white rounded-md p-2'
								onClick={() => handleSubmit()}
								disabled={isLoading}
							>
								{isLoading ? (
									<p className='flex mx-auto'>
										<AiOutlineLoading
											color='white'
											size={22}
											className='animate-spin h-auto mx-auto'
										/>
										Add
									</p>
								) : (
									<p className='flex mx-auto'>
										<FiPlus color='white' size={22} className='py-auto mr-2' />
										Add
									</p>
								)}
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
